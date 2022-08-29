const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
const oAuthController = require("../controllers/oAuth");
const passport = require("passport");
const { isAuthorizedByNotion } = require("../middleware");
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/books",
    failureFlash: true,
    successFlash: true,
  }),
  oAuthController.googleRegisterOrLogin
);
router.get(
  "/notion",
  wrapAsync(isAuthorizedByNotion),
  oAuthController.notionAuthenticate
);
router.get("/notion/callback", oAuthController.notionHandleCallback);
module.exports = router;
