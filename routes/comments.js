const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilities/wrapAsync.js");
const commentsController = require("../controllers/comments");
const {
  isLoggedIn,
  validateComment,
  isCmtAuthor,
  isSubcmtAuthor,
} = require("../middleware.js");

router
  .route("/:cmtId")
  .delete(isLoggedIn, isCmtAuthor, wrapAsync(commentsController.deleteComment))
  .put(
    isLoggedIn,
    isCmtAuthor,
    validateComment,
    wrapAsync(commentsController.updateComment)
  );

router
  .route("/:cmtId/likes")
  .post(isLoggedIn, wrapAsync(commentsController.likeComment));

router
  .route("/:cmtId/subcomments/:subcmtId/likes")
  .post(isLoggedIn, wrapAsync(commentsController.likeSubcomment));

router
  .route("/:cmtId/subcomments/:subcmtId")
  .delete(
    isLoggedIn,
    isSubcmtAuthor,
    wrapAsync(commentsController.deleteSubcomment)
  )
  .put(
    isLoggedIn,
    isSubcmtAuthor,
    validateComment,
    wrapAsync(commentsController.updateSubcomment)
  );

router
  .route("/:cmtId/subcomments")
  .post(
    isLoggedIn,
    validateComment,
    wrapAsync(commentsController.createSubComment)
  );

module.exports = router;

// //api/comments
