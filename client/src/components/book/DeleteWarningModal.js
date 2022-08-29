import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./DeleteWarningModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteBook } from "../../actions";
const DeleteWarningModal = ({ deleteBook, bookId, show, onHide }) => {
  const onDeleteClick = () => {
    deleteBook(bookId);
  };
  const renderModal = () => {
    return (
      <Modal className="" show={show} onHide={onHide}>
        <div className="modal-confirm">
          <div className="modal-content-body">
            <Modal.Header closeButton></Modal.Header>
            <div className="flex-column">
              <FontAwesomeIcon
                icon={faTrashCan}
                size="4x"
                style={{
                  color: "#f15e5e",
                }}
              />
              <Modal.Title className="w-100">Are you sure?</Modal.Title>
            </div>
            <Modal.Body>
              Do you really want to delete this post? This process cannot be
              undone.
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onDeleteClick}>
                Delete
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    );
  };
  return renderModal();
};
export default connect(null, { deleteBook })(DeleteWarningModal);
