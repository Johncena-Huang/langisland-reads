const mongoose = require("mongoose");
const { Schema } = mongoose;
const { formulateDate } = require("../utilities/helpers");
const commentSchema = new Schema(
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
    updatedAt: {
      type: Date,
      get: formulateDate,
    },
    subcomments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcomment",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } }
);
commentSchema.methods.getPublicFields = function () {
  return {
    body: this.body,
    updatedAt: this.updatedAt,
    _id: this._id,
  };
};
module.exports = mongoose.model("Comment", commentSchema);
// Mongoose schema set timestamp on nested document
// Reference https://stackoverflow.com/questions/59953941/mongoose-schema-set-timestamp-on-nested-document
