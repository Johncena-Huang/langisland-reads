import React from "react";
import InnerComment from "./InnerComment";
import OuterComment from "./OuterComment";
import CommentDropdown from "./CommentDropdown";
import { connect } from "react-redux";

const CommentItem = ({ comment, bookId, auth: { user } }) => {
  const renderSubcomment = () => {
    return comment.subcomments.map((subcomment) => {
      return (
        <OuterComment
          key={subcomment._id}
          userPhoto={subcomment.poster.picture.url}
        >
          <InnerComment
            comment={subcomment}
            bookId={bookId}
            commentId={comment._id}
            isGuest={!!!user}
          />
          <CommentDropdown
            bookId={bookId}
            commentId={comment._id}
            subcommentId={subcomment._id}
            isAuthor={user?._id === subcomment.poster._id}
          />
        </OuterComment>
      );
    });
  };
  return (
    <div className="comment d-flex flex-column">
      <OuterComment userPhoto={comment.poster.picture.url}>
        <InnerComment comment={comment} bookId={bookId} isGuest={!!!user} />
        <CommentDropdown
          bookId={bookId}
          commentId={comment._id}
          isAuthor={user?._id === comment.poster._id}
        />
      </OuterComment>
      <div className="replies-container">{renderSubcomment()}</div>
    </div>
  );
};
const mapStateToPros = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros)(CommentItem);

// how to pass props to {children} →React.Children React.cloneElement
