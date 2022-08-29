import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PhotoUploadInput = ({ onInputChange, photo }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const onFileChange = (e) => {
    if (e.target.files.length === 0) return;
    const objUrl = URL.createObjectURL(e.target.files[0]);
    setPhotoUrl(objUrl);
    const event = { target: { name: "picture", value: e.target.files[0] } };
    onInputChange(event);
  };
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3" visuallyHidden>
        Profile Photo
      </Form.Label>
      <Col className="d-flex justify-content-center ">
        <div className="position-relative">
          <Card.Img
            variant="top"
            className="rounded-circle"
            src={photoUrl || photo || "/profile-image.png"}
            style={{ width: "8rem", height: "8rem", objectFit: "cover" }}
          />
          <label
            htmlFor="profile-photo"
            className="position-absolute bottom-0 end-0"
          >
            <FontAwesomeIcon icon={faCamera} style={{ cursor: "pointer" }} />
          </label>
        </div>
      </Col>
      <input
        id="profile-photo"
        type="file"
        accept="image/*"
        className="d-none"
        onChange={onFileChange}
      />
    </Form.Group>
  );
};

export default PhotoUploadInput;
