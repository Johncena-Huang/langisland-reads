const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
const users = require("../controllers/users.js");
const passport = require("passport");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { isLoggedIn } = require("../middleware.js");

router.route("/users").post(wrapAsync(users.register));

router
  .route("/auth")
  .get(users.showCurrentUser)
  .put(isLoggedIn, upload.single("picture"), wrapAsync(users.updateUser))
  .post(
    passport.authenticate("local", {
      failWithError: true,
      successFlash: true,
      keepSessionInfo: true,
    }),
    users.login
  );

router.route("/logout").get(users.logout);
router
  .route("/forgot-password")
  .post(wrapAsync(users.sendPasswordResetToken))
  .get(wrapAsync(users.verifyPasswordToken))
  .put(wrapAsync(users.changePassword));
router.post("/resend-token", wrapAsync(users.resendToken));

router.route("/verify/token").get(wrapAsync(users.verifyFromEmail));

module.exports = router;

/* The latest version of passport will clear the session(req.session) each time passport.authenticate() is executed.
In order to prevent it from happening, "keepSessionInfo" should be set to "true" as discussed here
reference: 
According to this article  'https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d', I added  'keepSessionInfo: true'  in my code and the page get redirected to the same page that I was trying to access before logging in. Hope this helps.
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    failureMessage: true,
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash("success", "User logged to YelpCamp");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);
*/
