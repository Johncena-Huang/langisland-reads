const GoogleUser = require("../models/googleUser.js");
const User = require("../models/user.js");
const ExpressError = require("./ExpressError");
exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user has logged in
    if (!req.user) {
      const googleUser = await User.findOne({
        $or: [{ googleId: profile.id }, { email: profile.email }],
      });
      if (googleUser) {
        return done(null, googleUser);
      }
      const newGoogleUser = new User({
        googleId: profile.id,
        googleToken: accessToken,
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: { url: profile.picture, filename: "" },
        isVerified: true,
        expires: undefined,
      });
      await newGoogleUser.save();
      return done(null, newGoogleUser);
    } else {
      // If the user has already logged in
      done(null, false, req.flash("error", "you have already logged in"));
    }
  } catch (err) {
    req.flash("error", "You have already logged in!");
    return done(err, null);
  }
};

// exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if the user has logged in
//     if (!req.user) {
//       const googleUser = await GoogleUser.findOne({ googleId: profile.id });
//       if (googleUser) {
//         return done(null, googleUser);
//       }
//       const newGoogleUser = new GoogleUser({
//         googleId: profile.id,
//         token: accessToken,
//         email: profile.email,
//         firstName: profile.given_name,
//         lastName: profile.family_name,
//         picture: profile.picture,
//       });
//       await newGoogleUser.save();
//       return done(null, newGoogleUser);
//     } else {
//       // If the user has already logged in
//       return done(
//         null,
//         false,
//         req.flash("error", "You have already logged in!")
//       );
//     }
//   } catch (err) {
//     req.flash("error", err.message);
//     return done(err, null);
//   }
// };
