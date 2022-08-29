import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PhotoUploadInput from "./PhotoUploadInput";
import useProfileFormValidator from "../../hooks/useProfileFormValidator";
import { connect } from "react-redux";
import { updateUser } from "../../actions";
const initialState = {
  picture: "",
  firstName: "",
  lastName: "",
  email: "",
  introduction: "",
  location: "",
  hobbies: "",
  socialMedia: "",
  linkUrl: "",
};
const Profile = ({ userProfile, updateUser }) => {
  const [formData, setFormData] = useState(initialState);
  const { validateForm, errors } = useProfileFormValidator(formData);
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const profileData = { ...initialState };
    for (const key in userProfile) {
      if (key in profileData) profileData[key] = userProfile[key];
    }
    setFormData(profileData);
  }, [userProfile]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateForm();
    if (!isValid) return;
    updateUser(formData);
  };
  const {
    picture,
    firstName,
    lastName,
    email,
    introduction,
    location,
    hobbies,
    socialMedia,
    linkUrl,
  } = formData;
  return (
    <Container style={{ maxWidth: "769px" }} className="my-3">
      <Card>
        <Card.Header style={{ backgroundColor: "rgb(120, 182, 175, 0.6)" }}>
          &nbsp;
        </Card.Header>
        <Card.Body className="px-7">
          <Card.Title className="text-center mb-3">User Profile</Card.Title>
          <Form noValidate onSubmit={onFormSubmit}>
            <PhotoUploadInput onInputChange={onInputChange} photo={picture} />
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                First Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="firstName"
                  required
                  onChange={onInputChange}
                  value={firstName}
                  isInvalid={errors.firstName.isInvalid}
                  isValid={errors.firstName.isInvalid === null}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Last Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="lastName"
                  required
                  onChange={onInputChange}
                  value={lastName}
                  isInvalid={errors.lastName.isInvalid}
                  isValid={errors.lastName.isInvalid === null}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control readOnly value={email} disabled />
              </Col>
            </Form.Group>
            <Card.Title className="mb-3 text-center">
              Personal Information
            </Card.Title>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Introduction
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="introduction"
                  value={introduction}
                  onChange={onInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Location
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="location"
                  onChange={onInputChange}
                  value={location}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Hobbies
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="hobbies"
                  onChange={onInputChange}
                  value={hobbies}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Social Media
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  name="socialMedia"
                  aria-label="Default select"
                  onChange={onInputChange}
                  value={socialMedia}
                >
                  <option>Please Select</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Github">Github</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Link URL
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="linkUrl"
                  onChange={onInputChange}
                  value={linkUrl}
                />
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center ">
              <Button
                style={{
                  backgroundColor: "rgb(120, 182, 175)",
                  borderColor: "rgb(120, 182, 175)",
                }}
                as="input"
                type="submit"
                value="Save Changes"
                size="lg"
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
const mapStateToPros = (state) => {
  return { userProfile: state.auth.user };
};
export default connect(mapStateToPros, { updateUser })(Profile);
