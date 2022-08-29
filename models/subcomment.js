const mongoose = require("mongoose");
const { Schema } = mongoose;
const { formulateDate } = require("../utilities/helpers");
const subcommentSchema = new Schema(
  {
    body: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    poster: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      get: formulateDate,
    },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } }
);
// *** When the "argument" is needed, then "methods" should be chosen over "virtuals"
// Reference https://stackoverflow.com/questions/13566817/add-arguments-in-a-virtual-getter
// *** When "specific fields(Public fields)" should be returned, "methods" is deployed for a more clean solution.
// Reference https://stackoverflow.com/questions/62690011/mongoose-how-to-return-specific-fields-on-save
// Reference https://stackoverflow.com/questions/14196162/after-saving-an-object-using-mongoose-what-is-the-simplest-way-i-can-return-an

subcommentSchema.methods.getPublicFields = function (user) {
  return {
    _id: this._id,
    body: this.body,
    poster: user.firstName,
    createdAt: this.createdAt,
  };
};
subcommentSchema.virtual("publicFields").get(function () {
  return {
    body: this.body,
    poster: this.poster.firstName,
    createdAt: this.createdAt,
  };
});
module.exports = mongoose.model("Subcomment", subcommentSchema);
