const Book = require("../models/book.js");
module.exports.index = async (req, res) => {
  const books = await Book.find({}).populate({
    path: "poster",
    select: "firstName lastName",
  });
  res.send(books);
};

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body.book);
  book.poster = req.user._id;
  await book.save();
  res.json({
    message: "This book abstract has been created successfully !",
    status: "success",
  });
};

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, {
    ...req.body.book,
  });
  res.json({
    message: "This book abstract has been updated successfully !",
    status: "success",
  });
};
// not complete yet
// Multiple populates
//Reference https://stackoverflow.com/questions/46001213/mongoose-multiple-deep-populates
module.exports.showBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id)
    .populate("likes", "firstName lastName picture.url")
    .populate({
      path: "comments",
      populate: [
        {
          path: "likes",
          select: "firstName lastName picture.url",
        },
        {
          path: "poster",
          select: "firstName lastName picture.url",
        },
        {
          path: "subcomments",
          populate: [
            {
              path: "poster",
              select: "firstName lastName picture.url",
            },
            {
              path: "likes",
              select: "firstName lastName picture.url",
            },
          ],
        },
      ],
    })
    .populate("poster", "firstName lastName picture.url");
  res.send(book);
};

module.exports.likeBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("likes");
  const hasUserLikedTheBook = book.likes.some((like) =>
    like.equals(req.user._id)
  );
  if (hasUserLikedTheBook) {
    book.likes.pull(req.user);
  } else {
    book.likes.push(req.user);
  }
  await book.save();
  res.json({
    message: "This book has been successfully deleted!",
    status: "success",
  });
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({
    message: "This book has been successfully deleted!",
    status: "success",
  });
};
