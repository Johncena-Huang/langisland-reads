const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
  googleId: String,
  token: String,
  email: String,
  firstName: String,
  lastName: String,
  picture: String,
  introduction: String,
  location: String,
  hobbies: String,
  socialMedia: {
    type: String,
    enum: ["Facebook", "Instagram", "LinkedIn", "Twitter", "Github"],
  },
  linkUrl: String,
});

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);
