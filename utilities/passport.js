const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth2");
const oAuth = require("./oAuth.js");
exports.passportInit = (app) => {
  // PASSPORT CONFIGURATION
  // initialization
  app.use(passport.initialize());
  // consistent login
  app.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate())
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/oauth/google/callback`,
        passReqToCallback: true,
        proxy: true,
      },
      oAuth.authUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.userProfile);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  //   passport.serializeUser(User.serializeUser());
  //   passport.deserializeUser(User.deserializeUser());
};

/*
(1.) take email and password from req.body
(2.) do the query in the database in search of the user by the given info
(2.1) When the user is passed, req.login will be called to login the user
(3.) seralizer gets called if there is a match 
(4.) attach the passed object to req.session.passport.user and req.user
On the next request 
(1.) the session id in cookie is taken and search for the serialized user object 
in the session and attach it on req.session.passport.user
(2.)Make sure there is a user object on session.passport
(3.) call deserializeUser which takes the "id" from req.session.passport.user
and do the query in the database.
Once found, it will attach the object on "req.user"
*/
