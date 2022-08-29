import React from "react";
const generatePageRange = (currentPage, pageCount, delta = 2) => {
  const range = new Array(pageCount).fill().map((_, index) => index + 1);
  return range.reduce((pages, page) => {
    if (page === 1 || page === pageCount) {
      return [...pages, page];
    }
    if (page >= currentPage - delta && page <= currentPage + delta) {
      return [...pages, page];
    }
    if (pages[pages.length - 1] !== "...") {
      return [...pages, "..."];
    }
    return pages;
  }, []);
};

const SearchPagination = ({
  isLoading,
  bookCount,
  currentPage,
  resultsPerPage,
  onPageChange,
}) => {
  const renderPagination = () => {
    if (isLoading) return;
    const pageCount = Math.ceil(bookCount / resultsPerPage);
    return generatePageRange(currentPage, pageCount).map((num, index) => {
      if (num === currentPage) {
        return (
          <li
            className="page-item active"
            aria-current="page"
            onClick={() => onPageChange(num)}
          >
            <span className="page-link">{num}</span>
          </li>
        );
      }
      return (
        <li className="page-item" onClick={() => onPageChange(num)}>
          <a className="page-link" href="#">
            {num}
          </a>
        </li>
      );
    });
  };
  return (
    <nav aria-label="Page">
      <ul className="pagination d-flex justify-content-center">
        {renderPagination()}
      </ul>
    </nav>
  );
};

export default SearchPagination;
