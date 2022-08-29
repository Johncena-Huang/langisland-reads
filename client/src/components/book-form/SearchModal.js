import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import SearchBookCollection from "./SearchBookCollection";
import SearchPagination from "./SearchPagination";
const RESULTS_PER_PAGE = 40;

const SearchModal = ({ show, onClose, title, onTitleChange }) => {
  const searchTerm = useDebounce(title);
  const isMounted = useRef(false);
  const [searchResults, setSearchResults] = useState({
    isLoading: true,
    books: [],
    bookCount: null,
    currentPage: 1,
  });
  const { isLoading, books, bookCount, currentPage } = searchResults;

  useEffect(() => {
    if (isMounted.current && show) {
      const getBooks = async () => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+intitle:${searchTerm}&startIndex=${
            (currentPage - 1) * RESULTS_PER_PAGE
          }&maxResults=${RESULTS_PER_PAGE}`
        );
        const data = await response.json();
        setSearchResults({
          ...searchResults,
          books: data.items,
          bookCount: data.totalItems,
          isLoading: false,
        });
      };
      getBooks();
    } else {
      isMounted.current = true;
    }
    return setSearchResults({ ...searchResults, isLoading: true });
  }, [searchTerm, currentPage, show]);

  return (
    <Modal show={show} fullscreen onHide={onClose}>
      <Modal.Header closeButton>
        <InputGroup>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </InputGroup>
      </Modal.Header>
      <Modal.Body>
        <SearchBookCollection isLoading={isLoading} books={books} />
        <SearchPagination
          isLoading={isLoading}
          bookCount={bookCount}
          currentPage={currentPage}
          resultsPerPage={RESULTS_PER_PAGE}
          onPageChange={(num) =>
            setSearchResults({ ...searchResults, currentPage: num })
          }
        />
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
