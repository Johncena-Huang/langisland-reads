import React, { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import BookCard from "./BookCard";
import { fetchBooks } from "../../actions";
const BookGallery = ({ fetchBooks, books: { books } }) => {
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  const renderBooks = () => {
    if (books) {
      {
        return books.map((book, index) => {
          return <BookCard key={index} book={book} />;
        });
      }
    }
  };
  return (
    <Container className="mt-5">
      <Row>{renderBooks()}</Row>
    </Container>
  );
};
const mapStateToPros = (state) => {
  return { books: state.books };
};
export default connect(mapStateToPros, { fetchBooks })(BookGallery);
