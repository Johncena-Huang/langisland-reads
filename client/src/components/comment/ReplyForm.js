import React, { useState } from "react";
import { connect } from "react-redux";
import { addSubcomment } from "../../actions";
const ReplyForm = ({ show, handleShow, commentId, bookId, addSubcomment }) => {
  const [text, setText] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    addSubcomment(bookId, commentId, { comment: { body: text } });
    handleShow();
  };
  return (
    <form
      id="commentForm"
      className={`comment-reply-form ${show ? "" : "d-none"}`}
      onSubmit={onFormSubmit}
    >
      <fieldset>
        <div className="mb-3">
          <label htmlFor="subComment" className="form-label"></label>
          <textarea
            className="form-control comment-area "
            name="subComment"
            id="subComment"
            cols="30"
            rows="3"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button className="btn btn-success btn-submit" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary btn-dismiss mx-1"
            onClick={handleShow}
          >
            Dismiss
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default connect(null, { addSubcomment })(ReplyForm);
