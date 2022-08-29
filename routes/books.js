const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
const booksController = require("../controllers/books");
const commentsController = require("../controllers/comments");
const {
  validateBook,
  validateComment,
  isAuthorizedByNotion,
  isLoggedIn,
  isAuthor,
} = require("../middleware.js");
router
  .route("/")
  .get(wrapAsync(booksController.index))
  .post(validateBook, wrapAsync(booksController.createBook));
router.route("/:id/likes").post(isLoggedIn, booksController.likeBook);

router
  .route("/:id")
  .get(wrapAsync(booksController.showBook))
  .put(
    isLoggedIn,
    isAuthor,
    validateBook,
    wrapAsync(booksController.updateBook)
  )
  .delete(isLoggedIn, isAuthor, wrapAsync(booksController.deleteBook));

router
  .route("/:id/comments")
  .post(
    validateComment,
    isLoggedIn,
    wrapAsync(commentsController.createComment)
  );
module.exports = router;
