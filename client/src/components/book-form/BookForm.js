import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import SearchModal from "./SearchModal";
import TextEditor from "./TextEditor";
import useBookFormValidator from "../../hooks/useBookFormValidator";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { useMatch } from "react-router-dom";
import { fetchBook, addBook, updateBook } from "../../actions";
import "./BookForm.css";
export const ModalContext = React.createContext();
export const FormContext = React.createContext();
const initialState = {
  title: "",
  author: "",
  genre: "",
  cover: "",
  introduction: "",
  summary: "",
};
const BookForm = ({
  fetchBook,
  addBook,
  updateBook,
  books: { book, loading },
}) => {
  const coverRef = useRef();
  const referenceRef = useRef();
  const [editorLoading, setEditorLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const editingBook = useMatch("/books/:id/edit");
  const { validateForm, errors } = useBookFormValidator(formData);
  const [show, setShow] = useState(false);
  const { title, author, genre, cover, introduction, summary } = formData;
  console.log("I am in book-form route");
  useLayoutEffect(() => {
    const { height } = referenceRef.current.getBoundingClientRect();
    coverRef.current.style.height = height + "px";
  }, []);
  useEffect(() => {
    if (editingBook) {
      if (!book) fetchBook(editingBook.params.id);
      if (!loading && book) {
        const bookData = { ...initialState };
        for (const key in book) {
          if (key in bookData) bookData[key] = book[key];
        }
        setFormData(bookData);
      }
    }
  }, [loading, book, fetchBook]);

  const onShow = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  const onSearchClick = () => {
    onShow();
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateForm();
    if (!isValid) return;
    if (editingBook) {
      updateBook(book._id, formData);
    } else {
      addBook(formData);
    }
  };
  return (
    <div className="row my-5">
      {(editorLoading || (editingBook ? loading : false)) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 999,
            backgroundColor: "rgb(0,0,0,0.2)",
          }}
        >
          <Spinner animation="border" style={{ color: "#78b6af" }} />
        </div>
      )}
      <div className="col-6 offset-3">
        <Form noValidate onSubmit={onFormSubmit}>
          <div className="row row-cols-2">
            <div className="col-8 content-left" ref={referenceRef}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Book Title</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="title"
                    required
                    onChange={onInputChange}
                    value={title}
                    isInvalid={errors.title.isInvalid}
                  />
                  <Button variant="outline-secondary" onClick={onSearchClick}>
                    Search
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.title.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  required
                  onChange={onInputChange}
                  value={author}
                  readOnly
                  isInvalid={errors.author.isInvalid}
                  isValid={errors.author.isInvalid === null}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="genre">
                <Form.Label>Book Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  required
                  onChange={onInputChange}
                  value={genre}
                  readOnly
                  isInvalid={errors.genre.isInvalid}
                  isValid={errors.genre.isInvalid === null}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.genre.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-4">
              <div className="card cover-frame" ref={coverRef}>
                <img
                  id="cover"
                  alt="Cover image"
                  src={cover || require("./default-image.jpg")}
                  className="card-img-top img-thumbnail"
                />
                <input
                  id="cover-url"
                  name="cover"
                  type="hidden"
                  value={cover}
                />
              </div>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="introduction">
            <Form.Label>Book Introduction</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="introduction"
              style={{ resize: "none" }}
              required
              readOnly
              onChange={onInputChange}
              value={introduction}
              isInvalid={errors.introduction.isInvalid}
              isValid={errors.introduction.isInvalid === null}
            />
            <Form.Control.Feedback type="invalid">
              {errors.introduction.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>Book Abstract</Form.Label>
            <TextEditor
              handleEditor={(value) =>
                setFormData({ ...formData, summary: value })
              }
              summary={summary}
              isInvalid={errors.summary.isInvalid}
              errorMessage={errors.summary.message}
              setLoading={setEditorLoading}
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <ModalContext.Provider value={{ show, onClose }}>
          <FormContext.Provider value={{ formData, setFormData }}>
            <SearchModal
              title={title}
              onTitleChange={(value) =>
                setFormData({ ...formData, title: value })
              }
              show={show}
              onClose={onClose}
            />
          </FormContext.Provider>
        </ModalContext.Provider>
      </div>
    </div>
  );
};
const mapStateToPros = (state) => {
  return { books: state.books };
};
export default connect(mapStateToPros, {
  fetchBook,
  addBook,
  updateBook,
})(BookForm);
