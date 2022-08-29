import React, { useContext } from "react";
import { FormContext, ModalContext } from "./BookForm";
const BookCard = ({ bookInfo }) => {
  const form = useContext(FormContext);
  const modal = useContext(ModalContext);
  const onCardClick = (info) => {
    form.setFormData({
      ...form.formData,
      title: info.volumeInfo.title,
      author: info.volumeInfo.authors?.[0] || "unknown",
      genre: info.volumeInfo?.categories?.[0] || "unknown",
      cover: `https://books.google.com/books/publisher/content/images/frontcover/${info.id}?fife=w400-h600&source=gbs_api`,
      introduction: info.volumeInfo.description,
    });
    modal.onClose();
  };
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-stretch">
      <div
        className="card m-3 w-100"
        style={{ cursor: "pointer" }}
        onClick={() => onCardClick(bookInfo)}
      >
        <img
          className="card-img-top modal-img img-thumbnail"
          alt={bookInfo.volumeInfo.title}
          src={`https://books.google.com/books/publisher/content/images/frontcover/${bookInfo.id}?fife=w400-h600&source=gbs_api`}
        />
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">${bookInfo.volumeInfo.title}</h5>
          <h6 className="card-subtitle">
            ${bookInfo.volumeInfo.authors?.[0] || "Unknown author"}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
