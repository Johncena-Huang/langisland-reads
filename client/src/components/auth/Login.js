import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, resendToken, resetPassword, googleOauth } from "../../actions";
import ModalReset from "./ModalReset";
// Helper function
const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
// Functional Component
const Login = ({ login, isAuthenticated, resetPassword, googleOauth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { email, password } = formData;
  const findFormErrors = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "The email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "This email is invalid";
    }
    if (!password) newErrors.password = "The password is required";

    return newErrors;
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!!errors[e.target.name] && e.target.value !== "")
      setErrors({ ...errors, [e.target.name]: null });
  };
  const onPasswordRequest = (email) => {
    resetPassword(email);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }
    login(formData);
  };
  if (isAuthenticated) {
    return <Navigate to="/books" />;
  }
  return (
    <Container className="my-auto">
      <Row>
        <Col lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
          <Card className="shadow">
            <h5 className="border-bottom p-3">Sign In</h5>
            <Card.Body>
              <Form noValidate onSubmit={onFormSubmit}>
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
                <div className="mb-3 d-flex justify-content-between">
                  <ModalReset
                    className="text-decoration-none"
                    style={{ color: "#78b6af" }}
                    name="Forget Password"
                    title="Forgot Password "
                    content="Email address"
                    action="Send"
                    onRequest={onPasswordRequest}
                  />
                </div>
                <div className="d-grid my-3">
                  <Button
                    style={{ backgroundColor: "#78b6af", border: "none" }}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
              <div className="d-grid">
                <a className="btn btn-danger" href="oauth/google">
                  Sign In/Up with Google
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToPros = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToPros, {
  login,
  resetPassword,
  googleOauth,
})(Login);
