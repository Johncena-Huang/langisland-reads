const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    requird: true,
  },
  cover: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
BookSchema.virtual("getLikesListOfUsers").get(function () {
  return this.likes.map((like) => like.firstName);
});
module.exports = mongoose.model("Book", BookSchema);
