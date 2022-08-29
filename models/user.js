const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
  googleId: String,
  googleToken: String,
  picture: {
    url: {
      type: String,
      default: "",
    },
    filename: {
      type: String,
      default: "",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  hobbies: {
    type: String,
    default: "",
  },
  socialMedia: {
    type: String,
    enum: ["Facebook", "Instagram", "LinkedIn", "Twitter", "Github", ""],
    default: "",
  },
  linkUrl: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  expires: {
    type: Date,
    default: undefined,
    expires: "24h",
  },
});

userSchema.virtual("userProfile").get(function () {
  return {
    _id: this._id.toString(),
    picture: this.picture.url,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    introduction: this.introduction,
    location: this.location,
    hobbies: this.hobbies,
    socialMedia: this.socialMedia,
    linkUrl: this.linkUrl,
  };
});
// The username, passport and other methods will be added on to the field
userSchema.plugin(passportLocalMongoose, {
  limitAttempts: true,
  maxAttempts: 10,
  interval: 100,
  maxInterval: 300000,
  usernameField: "email",
  TooManyAttemptsError:
    "Account locked due to too many failed login attempts. Please reset your password to unlock your account.",
});
module.exports = mongoose.model("User", userSchema);

/* 
Authenticate via email rather than username 
Reference https://stackoverflow.com/questions/62293041/duplicate-key-error-index-in-mongodb-mongoose
Solution https://stackoverflow.com/questions/61091800/setting-up-facebook-authentication-with-mongodb-atlas-and-passport-js
Explanation Not all software that creates indexes will automatically delete indexes that are not explicitly mentioned but exist in the database. To delete any index you can use database administration software like MongoDB Compass. –
*/

// design a model with nested object
// https://hashnode.com/post/creating-nested-mongoose-schema-model-cjovnrjfw003ibus157dplri0

// Prevent a field update in mongodb
// https://stackoverflow.com/questions/53167182/how-do-i-prevent-a-field-update-in-moongoose
