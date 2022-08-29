import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
const findEmailError = (email) => {
  const newError = {};
  if (!email) {
    newError.email = "The email is required";
  } else if (!validateEmail(email)) {
    newError.email = "This email is invalid";
  }

  return newError;
};
const ModalReset = ({ name, title, content, action, onRequest }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const { email } = formData;

  const handleClose = (e) => {
    setShow(false);
    // clean up the form
    setFormData({ email: "" });
    setError({});
  };
  const handleShow = () => setShow(true);
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // After user types in the first character, the valid message should vanish
    if (error[e.target.name] === null)
      return setError({ [e.target.name]: undefined });
    if (!!error[e.target.name] && e.target.value !== "")
      return setError({ ...error, [e.target.name]: null });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // Prevent the submit from child form trigger the submit on the parent form on the same page
    e.stopPropagation();
    const error = findEmailError(email);
    if (Object.keys(error).length > 0) {
      return setError(error);
    }
    onRequest(email);
    handleClose(e);
  };

  return (
    <>
      <div
        className="text-decoration-none"
        style={{ color: "#78b6af", cursor: "pointer" }}
        onClick={handleShow}
      >
        {name}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="resendTokenForm" onSubmit={onSubmit} noValidate>
            <Form.Label>{content}</Form.Label>
            <Form.Control
              onChange={onInputChange}
              value={email}
              type="email"
              name="email"
              placeholder="Please enter your email"
              isInvalid={!!error.email}
              isValid={error.email === null}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error.email}
            </Form.Control.Feedback>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="resendTokenForm" variant="primary" type="submit">
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalReset;
