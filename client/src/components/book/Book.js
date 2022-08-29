import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { fetchBook, clearBook } from "../../actions";
import BookItem from "./BookItem";
import { useParams } from "react-router-dom";
import CommentForm from "../comment/CommentForm";
import CommentItem from "../comment/CommentItem";
import "../comment/Comment.css";
const Book = ({ books: { book, loading }, fetchBook, clearBook }) => {
  let { id } = useParams();
  const generateComments = () => {
    return book.comments.map((comment) => {
      return (
        <CommentItem key={comment._id} comment={comment} bookId={book._id} />
      );
    });
  };
  useEffect(() => {
    fetchBook(id);
    return () => {
      clearBook();
    };
  }, [id]);
  return loading || book === null ? (
    <Spinner animation="border" style={{ color: "#78b6af" }} />
  ) : (
    <div
      className="container-main mx-auto my-5 shadow"
      style={{ backgroundColor: "#fff", maxWidth: "900px" }}
    >
      <BookItem book={book} />
      <hr />
      <CommentForm bookId={book._id} />
      <section className="comments px-5 py-3">{generateComments()}</section>
    </div>
  );
};
const mapStateToPros = (state) => {
  return { books: state.books };
};
export default connect(mapStateToPros, { fetchBook, clearBook })(Book);
