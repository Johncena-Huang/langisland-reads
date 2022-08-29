import React from "react";
import Spinner from "react-bootstrap/Spinner";
import BookCard from "./BookCard";

const SearchBookCollection = ({ isLoading, books }) => {
  const renderBookCollection = () => {
    if (!isLoading) {
      return books.map((book) => {
        return <BookCard key={book.id} bookInfo={book} />;
      });
    }
    return (
      <Spinner animation="border" style={{ color: "#78b6af" }} role="status">
        <span className="visually-hidden"></span>
      </Spinner>
    );
  };

  return <div className="row book-collection">{renderBookCollection()}</div>;
};

export default SearchBookCollection;
