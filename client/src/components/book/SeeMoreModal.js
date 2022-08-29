import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SeeMoreModal = ({ likes, show, handleClose }) => {
  const generateUsers = () => {
    return likes.map((like) => {
      return (
        <tr key={like._id}>
          <td>
            <span className="badge bg-secondary">
              <FontAwesomeIcon icon={faUser} />
            </span>
            &nbsp;
            {like.firstName}
          </td>
        </tr>
      );
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book likes:{likes.length}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped>
          <thead>
            <tr>
              <th>Liked by:</th>
            </tr>
          </thead>
          <tbody id="like-modal-body">{generateUsers()}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SeeMoreModal;
