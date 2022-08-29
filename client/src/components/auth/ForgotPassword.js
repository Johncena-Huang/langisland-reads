import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { verifyPasswordToken, changePassword } from "../../actions";
const ForgotPassword = ({ verifyPasswordToken, changePassword }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    verifyPasswordToken(token);
  }, [token]);
  const [formData, setFormData] = useState({
    password: "",
    cfm_password: "",
    token: token,
  });
  const [errors, setErrors] = useState({});
  const { password, cfm_password } = formData;
  const findFormErrors = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "The password is required";
    }
    if (!cfm_password) newErrors.cfm_password = "Please confirm your password";

    if (password !== cfm_password && password && cfm_password)
      newErrors.cfm_password = "Passwords mismatch";

    return newErrors;
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // After user types in the first character, the valid message should vanish
    if (errors[e.target.name] === null)
      return setErrors({ ...errors, [e.target.name]: undefined });
    if (!!errors[e.target.name] && e.target.value !== "")
      return setErrors({ ...errors, [e.target.name]: null });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }
    changePassword(formData);
  };
  return (
    <Fragment>
      <div className="container my-auto">
        <div className="row my-5">
          <div className="col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="card shadow">
              <h5 className="border-bottom p-3">Update Password</h5>
              <div className="card-body">
                <Form noValidate onSubmit={onFormSubmit}>
                  <Form.Group as={Col} className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      autoFocus
                      required
                      onChange={onInputChange}
                      value={password}
                      isInvalid={!!errors.password}
                      isValid={errors.password === null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="cfm_password"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="cfm_password"
                      autoFocus
                      required
                      onChange={onInputChange}
                      value={cfm_password}
                      isInvalid={!!errors.cfm_password}
                      isValid={errors.cfm_password === null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cfm_password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: "#78b6af", border: "none" }}
                    >
                      Change Password
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { verifyPasswordToken, changePassword })(
  ForgotPassword
);
