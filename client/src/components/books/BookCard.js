import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
const BookCard = ({ book: { _id, title, cover, introduction } }) => {
  return (
    <Col xs={12} md={4} lg={3}>
      <Card>
        <Card.Img
          src={cover}
          style={{
            objectFit: "contain",
            height: "15vw",
            marginTop: "1rem",
          }}
        />
        <Card.Body>
          <Card.Title className="h4">{title}</Card.Title>
          <h5 className="h5 text-muted"></h5>
          <Card.Text className="text-muted font-italic">
            {introduction.substring(0, 100) + "..."}
          </Card.Text>
          <Link className="btn btn-primary" to={`/books/${_id}`}>
            Read more
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;

// // object-fit: contain;
// // height: 15vw;
// // width: 100%;
// // margin-top: 1rem;
