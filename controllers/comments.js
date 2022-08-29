const Book = require("../models/book");
const Comment = require("../models/comment");
const Subcomment = require("../models/subcomment");
module.exports.createComment = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  const newComment = new Comment(req.body.comment);
  newComment.poster = req.user._id;
  book.comments.push(newComment);
  await book.save();
  await newComment.save();
  res.json({
    message: "The comment has been left successfully!",
    status: "success",
  });
};

module.exports.createSubComment = async (req, res) => {
  const { cmtId } = req.params;
  const comment = await Comment.findById(cmtId);
  const newSubcomment = new Subcomment({
    ...req.body.comment,
    poster: req.user._id,
  });
  comment.subcomments.push(newSubcomment);
  await comment.save();
  await newSubcomment.save();
  res.json({
    message: "The subcomment has been left successfully!",
    status: "success",
  });
};

module.exports.deleteComment = async (req, res) => {
  const { cmtId } = req.params;
  await Comment.findByIdAndDelete(cmtId);
  res.json({
    message: "This comment has been deleted!",
    status: "success",
  });
};

module.exports.updateComment = async (req, res) => {
  const { cmtId } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    cmtId,
    {
      ...req.body.comment,
    },
    { new: true }
  );
  res.json({
    message: "This comment has been updated!",
    status: "success",
  });
};

module.exports.deleteSubcomment = async (req, res) => {
  const { cmtId, subcmtId } = req.params;
  await Comment.findByIdAndUpdate(cmtId, { $pull: { subcomments: subcmtId } });
  await Subcomment.findByIdAndDelete(subcmtId);
  res.json({
    message: "This subcomment has been deleted",
    status: "success",
  });
};

module.exports.updateSubcomment = async (req, res) => {
  const { subcmtId } = req.params;
  await Subcomment.findByIdAndUpdate(
    subcmtId,
    {
      ...req.body.comment,
    },
    { new: true }
  );
  res.json({
    message: "This subcomment has been updated",
    status: "success",
  });
};

module.exports.likeComment = async (req, res) => {
  const { cmtId } = req.params;
  const comment = await Comment.findById(cmtId);
  const hasUserLikedTheComment = comment.likes.some((like) =>
    like.equals(req.user._id)
  );
  if (hasUserLikedTheComment) {
    comment.likes.pull(req.user);
  } else {
    comment.likes.push(req.user);
  }
  await comment.save();
  res.json({
    message: "This comment has been updated",
    status: "success",
  });
};

module.exports.likeSubcomment = async (req, res) => {
  const { subcmtId } = req.params;
  const subcomment = await Subcomment.findById(subcmtId);
  const hasUserLikedTheComment = subcomment.likes.some((like) =>
    like.equals(req.user._id)
  );
  if (hasUserLikedTheComment) {
    subcomment.likes.pull(req.user);
  } else {
    subcomment.likes.push(req.user);
  }
  await subcomment.save();
  res.json({
    message: "You have liked this subcomment!",
    status: "success",
  });
};
