import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, resendToken } from "../../actions";
import ModalReset from "./ModalReset";
// Helper function
const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
// Functional Component
const Register = ({ register, resendToken }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cfmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { firstName, lastName, email, password, cfmPassword } = formData;
  const findFormErrors = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "The first name is required";

    if (!lastName) newErrors.lastName = "The last name is required";

    if (!email) {
      newErrors.email = "The email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "This email is invalid";
    }
    if (!password) newErrors.password = "The password is required";

    if (!cfmPassword) newErrors.cfmPassword = "Please confirm your password";

    if (password !== cfmPassword) newErrors.cfmPassword = "Passwords mismatch";

    return newErrors;
  };
  const onTokenResend = (email) => {
    resendToken(email);
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!!errors[e.target.name] && e.target.value !== "")
      setErrors({ ...errors, [e.target.name]: null });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }
    register(formData);
  };
  return (
    <Container className="my-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
          <Card className="shadow">
            <h5 className="border-bottom p-3">Register</h5>
            <Card.Body>
              <Form noValidate onSubmit={onFormSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="first-name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      required
                      value={firstName}
                      onChange={onInputChange}
                      isInvalid={!!errors.firstName}
                      isValid={errors.firstName === null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="last-name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      required
                      value={lastName}
                      onChange={onInputChange}
                      isInvalid={!!errors.lastName}
                      isValid={errors.lastName === null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="email" className="mb-3">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={onInputChange}
                    isInvalid={!!errors.email}
                    isValid={errors.email === null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="password" className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={onInputChange}
                    isInvalid={!!errors.password}
                    isValid={errors.password === null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="cfm-password" className="mb-3">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="cfmPassword"
                    required
                    value={cfmPassword}
                    onChange={onInputChange}
                    isInvalid={!!errors.cfmPassword}
                    isValid={errors.cfmPassword === null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cfmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="mb-3 d-flex justify-content-between">
                  <Link
                    to="/login"
                    className="text-decoration-none"
                    style={{ color: "#78b6af" }}
                  >
                    Already got a user? Sign In Here!
                  </Link>
                  <ModalReset
                    className="text-decoration-none"
                    style={{ color: "#78b6af" }}
                    name="Resend Token"
                    title="Get New Verification Token"
                    content="Email address"
                    action="Send"
                    onRequest={onTokenResend}
                  />
                </div>
                <div className="d-grid my-3">
                  <Button
                    style={{ backgroundColor: "#78b6af", border: "none" }}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
                <div className="d-grid">
                  <a className="btn btn-danger" href="oauth/google">
                    Sign In/Up with Google
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, { register, resendToken })(Register);
