import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { LinkContainer } from "react-router-bootstrap";
import "./DropDownMenu.css";
import DeleteWarningModal from "./DeleteWarningModal";
import { connect } from "react-redux";
const DropDownMenu = ({ book, auth: { user } }) => {
  const [show, setShow] = useState(false);
  const renderDropDownMenu = () => {
    return (
      <Dropdown.Toggle
        variant="outline-secondary"
        size="lg"
        style={{ border: "0" }}
      >
        <FontAwesomeIcon icon={faEllipsis} size="xl" />
      </Dropdown.Toggle>
    );
  };
  if (!user || book.poster._id !== user._id) return;
  return (
    <>
      <Dropdown className="position-absolute top-0 end-0">
        {renderDropDownMenu()}
        <Dropdown.Menu>
          <LinkContainer to={`/books/${book._id}/edit`}>
            <Dropdown.Item as="button">Edit</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item
            as="button"
            onClick={() => setShow(true)}
            data-bs-toggle="modal"
            data-bs-target="#deleteCfmModal"
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteWarningModal
        bookId={book._id}
        show={show}
        onHide={() => setShow(false)}
      />
    </>
  );
};
const mapStateToPros = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros)(DropDownMenu);

{
  /* <Dropdown.Item
as="button"
data-bs-toggle="modal"
data-bs-target="#deleteCfmModal"
>
Delete
</Dropdown.Item> */
}
