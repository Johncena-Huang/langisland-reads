import {
  FETCH_BOOKS,
  FETCH_BOOK,
  UPDATE_BOOK_LIKES,
  CLEAR_BOOK,
} from "../actions/types";
const initialState = {
  books: [],
  book: null,
  loading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BOOKS: {
      return { ...state, books: payload, loading: false };
    }
    case FETCH_BOOK: {
      return { ...state, book: payload, loading: false };
    }
    case UPDATE_BOOK_LIKES: {
      return { ...state, book: payload, loading: false };
    }
    case CLEAR_BOOK: {
      return { ...state, book: null, loading: true };
    }
    default: {
      return state;
    }
  }
};
