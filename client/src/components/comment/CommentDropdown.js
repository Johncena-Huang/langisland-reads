import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteComment, deleteSubcomment } from "../../actions";
import { connect } from "react-redux";
const CommentDropdown = ({
  setReply,
  bookId,
  commentId,
  subcommentId,
  deleteComment,
  deleteSubcomment,
  isAuthor,
}) => {
  const onDeleteClick = () => {
    if (subcommentId) {
      deleteSubcomment(bookId, commentId, subcommentId);
    } else {
      deleteComment(bookId, commentId);
    }
  };
  const onEditClick = () => {
    setReply(true);
  };
  const renderDropDownMenu = () => {
    if (!isAuthor) return;
    return (
      <Dropdown.Toggle
        variant="outline-secondary"
        size="lg"
        style={{ border: "0" }}
      >
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </Dropdown.Toggle>
    );
  };

  return (
    <>
      <Dropdown className="position-absolute top-0 end-0">
        {renderDropDownMenu()}
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={onEditClick}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={onDeleteClick}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default connect(null, { deleteComment, deleteSubcomment })(
  CommentDropdown
);
