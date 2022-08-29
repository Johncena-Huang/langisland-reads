const crypto = require("crypto");
const Email = require("../utilities/emailHelper");
const helpers = require("../utilities/helpers");
const ExpressError = require("../utilities/ExpressError");
const Token = require("../models/token");
const User = require("../models/user");
const { serializeUser } = require("../utilities/helpers");
const { cloudinary } = require("../cloudinary");
module.exports.showCurrentUser = (req, res) => {
  res.json({ user: req?.user || null });
  // res.json({ user: req.user ? serializeUser(req.user) : "" });
};
module.exports.register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body.user;
  const registeredEmail = await User.find({ email });
  if (registeredEmail.length > 0) {
    throw new ExpressError("This email has been registered!", 409);
  }
  const user = new User({
    email,
    firstName,
    lastName,
    isVerified: false,
    expires: Date.now(),
  });
  const registeredUser = await User.register(user, password);
  const userToken = new Token({
    _userId: registeredUser._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await userToken.save();
  const url = helpers.setUrl(
    req,
    "verify-account",
    `token?token=${userToken.token}`
  );
  await new Email(user, url).sendWelcome("LangIsland");
  res.json({
    message:
      "Thanks for registering, Please check your email to verify your account. Link expires in 10 minutes",
    status: "success",
  });
};

module.exports.login = (req, res) => {
  // req.flash("success", "Welcome back!!!");
  // const redirectUrl = req.session.returnTo || "/books";
  // delete req.session.returnTo;
  res.json({
    user: req.user.userProfile,
    message: `Welcome back`,
    status: "success",
  });
  // res.redirect(redirectUrl);
};
module.exports.verifyFromEmail = async (req, res, next) => {
  // The difference between find() and findOne()
  // One returns an array while the other returns a document object
  const token = await Token.findOne({ token: req.query.token });
  if (!token) {
    throw new ExpressError("The token has expired. Please try again!", 409);
  }
  const user = await User.findById(token._userId);
  user.isVerified = true;
  user.expires = undefined;
  await user.save();
  await token.remove();
  req.login(user, (err) => {
    if (err) return next(err);
    res.json({
      user: serializeUser(req.user),
      message: `Welcome to LangIsland`,
      status: "success",
    });
  });
};
module.exports.logout = (req, res, next) => {
  // Since passport 0.6 version, req.logout() is now an asynchronous function
  // Solution https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Goodbye!!", status: "success" });
  });
};

module.exports.resendToken = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ExpressError("There is no user registered with this email", 409);
  }
  if (user.isVerified) {
    throw new ExpressError("This email has already been verified", 409);
  }
  const newToken = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await newToken.save();
  const url = helpers.setUrl(
    req,
    "verify-account",
    `token?token=${newToken.token}`
  );
  await new Email(user, url).sendWelcome("YelpCamp - New Token");
  res.json({
    message:
      "Thanks for registering, Please check your email to verify your account. Link expires in 10 minutes",
    status: "success",
  });
};

module.exports.sendPasswordResetToken = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ExpressError("There is no user registered with this email", 409);
  }
  const userToken = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await userToken.save();
  const url = helpers.setUrl(
    req,
    "forgot-password",
    `?token=${userToken.token}`
  );
  await new Email(user, url).sendPasswordReset();
  res.json({
    message: "Please check your email to reset your password.",
    status: "success",
  });
  const { statusCode, message } = err;
  res.status(statusCode).json({ message, status: "failure" });
};

module.exports.verifyPasswordToken = async (req, res) => {
  const token = await Token.findOne({ token: req.query.token });
  if (!token) {
    throw new ExpressError(
      "Token is invalid or expired, please request a new password reset token",
      409
    );
  }
  res.json({
    message: "Please reset your password as soon as possible before expiration",
    status: "success",
  });
};

module.exports.changePassword = async (req, res) => {
  const { password, cfm_password } = req.body;
  if (password !== cfm_password) {
    throw new ExpressError(
      "Passwords do not match. Click the link in your email to try again",
      409
    );
  }
  const token = await Token.findOne({ token: req.body.token });
  if (!token) {
    throw new ExpressError(
      "Token is invalid, please try to reset your password again",
      409
    );
  }
  const user = await User.findById(token._userId);
  await user.setPassword(req.body.password, async (err) => {
    if (err) {
      throw new ExpressError(err.message, 409);
    }
    delete req.body.cfm_password;
    user.attempts = 0;
    user.expires = undefined;
    let url = helpers.setUrl(req, "login", "");
    await new Email(user, url).sendPasswordChange();
    await user.save();
    await token.remove();
    res.json({
      message:
        "Your password has been successfully updated. Please login using your new password",
      status: "success",
    });
  });
};

// module.exports.showProfile = async (req, res) => {
//   const userProfile = await User.findById(req.user._id).populate("profile")
//     .userProfile;
//   res.json({
//     user: serializeUser(req.user),
//     message: `Welcome back`,
//     status: "success",
//   });
// };

module.exports.updateUser = async (req, res) => {
  delete req.body.picture;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  // update profile photo
  if (req.file) {
    // delete the previous profile photo on cloudinary(there won't be one for user registered via oauth)
    if (updatedUser.picture.filename)
      await cloudinary.uploader.destroy(updatedUser.picture.filename);

    updatedUser.picture = { url: req.file.path, filename: req.file.filename };
    await updatedUser.save();
  }
  res.json({
    user: updatedUser.userProfile,
    message: "User profile updated!!",
    status: "success",
  });
};
