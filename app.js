if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
// REQUIRE POST OVERRIDE
const methodOverride = require("method-override");
// REQUIRE ROUTERS
const userRoutes = require("./routes/user.js");
const oAuthRoutes = require("./routes/oAuth.js");
const bookRoutes = require("./routes/books.js");
const commentRoutes = require("./routes/comments.js");

const session = require("express-session");

const MongoDBStore = require("connect-mongo");
const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/langIslandBookClub";

const _passport = require("./utilities/passport.js");

// REQUIRE MONGOOSE
const mongoose = require("mongoose");

// REQUIRE FLASH PACKAGE
const flash = require("connect-flash");

const secret = process.env.SECRET || "shouldhavecomeupwithabettersecretcode";

// Declare session store(in memory by default)
const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret,
  },
  touchAfter: 24 * 60 * 60,
});
// Run store and test if there is any error
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });
app.engine("ejs", ejsMate);
app.use(session(sessionConfig));
_passport.passportInit(app);

app.use(flash());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// SERVING STATIC ASSETS
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "public")));
}

app.use((req, res, next) => {
  if (!["/login", "/"].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  console.log(req.flash("error"));
  next();
});
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/oauth", oAuthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/comments", commentRoutes);

// catch-all case for production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.dir(err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ message, status: "failure" });
});
app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
  console.log(`we are currently in ${process.env.NODE_ENV} mode`);
});
