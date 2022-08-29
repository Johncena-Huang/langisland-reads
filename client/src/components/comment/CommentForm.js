import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions";
const CommentForm = ({ auth: { user }, addComment, bookId }) => {
  const [text, setText] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    addComment(bookId, { comment: { body: text } });
    setText("");
  };
  return (
    <section className="px-5 py-3 user-comment">
      <h2>Discussion</h2>
      <div className="reply-box d-flex">
        <img
          src={user?.picture || "/profile-image.png"}
          alt="profile photo"
          className="profile rounded-circle"
        />
        <form id="commentForm" onSubmit={onFormSubmit}>
          <fieldset disabled={user ? false : true}>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label" />
              <textarea
                className={`form-control comment-area ${
                  user ? "" : "not-login"
                }`}
                name="comment"
                id="comment"
                cols={30}
                rows={3}
                required
                placeholder={user ? "" : "Please log in to leave the comment"}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="invalid-feedback">
                The content shouldn't be empty
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
const mapStateToPros = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, { addComment })(CommentForm);
