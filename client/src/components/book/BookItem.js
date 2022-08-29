import React from "react";
import "github-markdown-css/github-markdown-light.css";
import BookItemLikes from "./BookItemLikes";
import DropDownMenu from "./DropDownMenu";

const BookItem = ({ book }) => {
  return (
    <section className="px-5 py-3 position-relative">
      <DropDownMenu book={book} />
      <h1 className="h1 text-center mb-5" style={{ color: "#78b6af" }}>
        {book.title}
      </h1>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: book.summary }}
      ></article>
      <BookItemLikes book={book} />
    </section>
  );
};

export default BookItem;
