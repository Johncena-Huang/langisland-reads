import React, { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyForm from "./ReplyForm";
import { connect } from "react-redux";
import {
  updateCommentLikes,
  updateComment,
  updateSubcommentLikes,
  updateSubcomment,
} from "../../actions";
const InnerComment = ({
  auth: { user },
  comment,
  bookId,
  updateCommentLikes,
  updateSubcommentLikes,
  updateComment,
  updateSubcomment,
  reply,
  setReply,
  commentId,
  isGuest,
}) => {
  console.log("isGuest", isGuest);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [text, setText] = useState(comment.body);
  const onReplyClick = () => {
    setShowReplyBox(!showReplyBox);
  };
  const onUpdateClick = (e) => {
    e.preventDefault();
    if (text === "") return;
    if (commentId) {
      updateSubcomment(bookId, commentId, comment._id, {
        comment: { body: text },
      });
    } else {
      updateComment(bookId, comment._id, { comment: { body: text } });
    }
    setReply(false);
  };
  const onLikeClick = () => {
    if (commentId) {
      updateSubcommentLikes(bookId, commentId, comment._id);
    } else {
      updateCommentLikes(bookId, comment._id);
    }
  };
  const renderCommentBody = () => {
    if (reply)
      return (
        <form onSubmit={onUpdateClick}>
          <textarea
            name="comment"
            className="form-control comment-area my-3"
            rows="3"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="btn btn-success mb-1" type="submit">
            Update
          </button>
          <button
            className="btn btn-secondary mx-1 mb-1"
            onClick={() => setReply(false)}
          >
            Cancel
          </button>
        </form>
      );
    return <p>{comment.body}</p>;
  };
  const renderReplyButton = () => {
    if (commentId) return;
    return (
      <button
        className="btn btn-light btn-reply"
        onClick={onReplyClick}
        disabled={isGuest ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          role="img"
          aria-labelledby="a1ckno2nnnr3o84vdq5rl0b8g6fxwikq"
          className="crayons-icon reaction-icon not-reacted"
        >
          <title id="a1ckno2nnnr3o84vdq5rl0b8g6fxwikq">Comment button</title>
          <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
        </svg>
        <span>Reply</span>
      </button>
    );
  };
  return (
    <div className="inner-comment flex-grow-1">
      <div className="comment__content">
        <div className="comment__header text-muted">
          <span>{comment.poster.firstName}</span>
          <span>•</span>
          <span>&nbsp;{comment.createdAt}</span>
        </div>
        <div className="comment__body">{renderCommentBody()}</div>
      </div>
      <div className="comment__footer">
        <button
          className="btn btn-light btn-like d-inline-flex align-items-center"
          disabled={isGuest ? true : false}
          onClick={onLikeClick}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={
              user && comment.likes.some((like) => like._id === user._id)
                ? "liked"
                : ""
            }
          />
          <span className="mx-1 like-count">{comment.likes.length}</span>
          <span>likes</span>
        </button>
        {renderReplyButton()}
      </div>
      <ReplyForm
        show={showReplyBox}
        handleShow={onReplyClick}
        commentId={comment._id}
        bookId={bookId}
      />
    </div>
  );
};
const mapStateToPros = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, {
  updateCommentLikes,
  updateComment,
  updateSubcommentLikes,
  updateSubcomment,
})(InnerComment);
