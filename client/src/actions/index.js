import api from "../api/server";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  ALERT_FAILURE,
  ALERT_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_USER,
  FETCH_BOOKS,
  FETCH_BOOK,
  UPDATE_BOOK_LIKES,
  CLEAR_BOOK,
  UPDATE_USER,
} from "./types";
import history from "../history";
import { closeAlert, setAlert } from "./alert";
export const register = (formData) => async (dispatch) => {
  try {
    const response = await api.post("/users", { user: formData });
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message, status } = err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const verifyAccount = (token) => async (dispatch) => {
  try {
    const response = await api.get(`/verify/token?token=${token}`);
    const { message, status, user } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    history.push("/register");
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const response = await api.post("/auth", formData);
    const { user, message, status } = response.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message, status } = err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};
export const logout = () => async (dispatch) => {
  try {
    const response = await api.get("/logout");
    const { message, status } = response.data;
    dispatch({
      type: LOGOUT,
    });
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    history.push("/login");
  } catch (err) {
    const { message, status } = err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const resendToken = (email) => async (dispatch) => {
  try {
    const response = await api.post("/resend-token", { email });
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const response = await api.post("/forgot-password", { email });
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const verifyPasswordToken = (token) => async (dispatch) => {
  try {
    const response = await api.get(`/forgot-password/?token=${token}`);
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/login");
  }
};

export const changePassword = (formData) => async (dispatch) => {
  try {
    const response = await api.put("/forgot-password", formData);
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  } finally {
    history.push("/login");
  }
};

export const googleOauth = () => async (dispatch) => {
  const response = await api.get(`/auth/google`);
};

export const loadUser = () => async (dispatch) => {
  // Already prefixed with "api" in via config
  try {
    const response = await api.get("/auth");
    const { user } = response.data;
    console.log("loadUser", user);
    dispatch({ type: LOAD_USER, payload: user });
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/login");
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    // formData.picture "blob:http://localhost:3456/57f70d4b-5c97-41b0-bd28-1d25a1d28e5b"
    // // const pictureUrl = await fetch(formData.picture);
    // // const pictureBlob = await pictureUrl.blob();
    const form = new FormData();
    for (const key in formData) {
      // if (key === "picture") continue;
      form.append(key, formData[key]);
    }
    // form.append("picture", formData.picture, formData.picture.name);
    const response = await api({
      method: "put",
      url: "/auth",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { user, message, status } = response.data;
    dispatch({ type: UPDATE_USER, payload: user });
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    window.scrollTo(0, 0);
    // const { user } = response.data;
    // dispatch({ type: LOAD_USER, payload: user });
  } catch (err) {
    console.log(err);
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/login");
  }
};

export const fetchBooks = () => async (dispatch) => {
  const response = await api.get("/books");
  dispatch({ type: FETCH_BOOKS, payload: response.data });
};

export const fetchBook = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/books/${id}`);
    dispatch({ type: FETCH_BOOK, payload: response.data });
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/books");
  }
};

export const clearBook = () => (dispatch) => {
  dispatch({ type: CLEAR_BOOK });
};

export const addBook = (formData) => async (dispatch) => {
  try {
    const response = await api.post(`/books`, { book: formData });
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    history.push(`/books`);
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/books");
  }
};
export const updateBook = (id, formData) => async (dispatch) => {
  try {
    const response = await api.put(`/books/${id}`, { book: formData });
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    history.push(`/books/${id}`);
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
    history.push("/books");
  }
};

export const updateBookLikes = (id) => async (dispatch) => {
  try {
    const response = await api.post(`/books/${id}/likes`);
    dispatch(fetchBook(id));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/books/${id}`);
    const { message, status } = response.data;
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    history.push("/books");
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const addComment = (bookId, formData) => async (dispatch) => {
  try {
    const response = await api.post(`/books/${bookId}/comments`, formData);
    const { message, status } = response.data;
    dispatch(fetchBook(bookId));
    dispatch(setAlert(ALERT_SUCCESS, message, status));
    window.scrollTo(0, document.body.scrollHeight);
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};
export const updateCommentLikes = (bookId, commentId) => async (dispatch) => {
  try {
    const response = await api.post(`/comments/${commentId}/likes`);
    dispatch(fetchBook(bookId));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};
export const updateComment =
  (bookId, commentId, formData) => async (dispatch) => {
    try {
      const response = await api.put(`/comments/${commentId}`, formData);
      const { message, status } = response.data;
      dispatch(fetchBook(bookId));
      dispatch(setAlert(ALERT_SUCCESS, message, status));
    } catch (err) {
      const { message = "An error just occured", status = "failure" } =
        err.response.data;
      dispatch(setAlert(ALERT_FAILURE, message, status));
    }
  };

export const deleteComment = (bookId, commentId) => async (dispatch) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    const { message, status } = response.data;
    dispatch(fetchBook(bookId));
    dispatch(setAlert(ALERT_SUCCESS, message, status));
  } catch (err) {
    const { message = "An error just occured", status = "failure" } =
      err.response.data;
    dispatch(setAlert(ALERT_FAILURE, message, status));
  }
};

export const addSubcomment =
  (bookId, commentId, formData) => async (dispatch) => {
    try {
      const response = await api.post(
        `/comments/${commentId}/subcomments`,
        formData
      );
      const { message, status } = response.data;
      dispatch(fetchBook(bookId));
      dispatch(setAlert(ALERT_SUCCESS, message, status));
    } catch (err) {
      const { message = "An error just occured", status = "failure" } =
        err.response.data;
      dispatch(setAlert(ALERT_FAILURE, message, status));
    }
  };
export const updateSubcommentLikes =
  (bookId, commentId, subcommentId) => async (dispatch) => {
    try {
      const response = await api.post(
        `/comments/${commentId}/subcomments/${subcommentId}/likes`
      );
      dispatch(fetchBook(bookId));
    } catch (err) {
      const { message = "An error just occured", status = "failure" } =
        err.response.data;
      dispatch(setAlert(ALERT_FAILURE, message, status));
    }
  };

export const updateSubcomment =
  (bookId, commentId, subcommentId, formData) => async (dispatch) => {
    try {
      const response = await api.put(
        `/comments/${commentId}/subcomments/${subcommentId}`,
        formData
      );
      const { message, status } = response.data;
      dispatch(fetchBook(bookId));
      dispatch(setAlert(ALERT_SUCCESS, message, status));
    } catch (err) {
      const { message = "An error just occured", status = "failure" } =
        err.response.data;
      dispatch(setAlert(ALERT_FAILURE, message, status));
    }
  };
export const deleteSubcomment =
  (bookId, commentId, subcommentId) => async (dispatch) => {
    try {
      const response = await api.delete(
        `/comments/${commentId}/subcomments/${subcommentId}`
      );
      const { message, status } = response.data;
      dispatch(fetchBook(bookId));
      dispatch(setAlert(ALERT_SUCCESS, message, status));
    } catch (err) {
      const { message = "An error just occured", status = "failure" } =
        err.response.data;
      dispatch(setAlert(ALERT_FAILURE, message, status));
    }
  };

// how to check object created by FormData?
// https://stackoverflow.com/questions/37235810/formdata-object-shows-empty-even-after-calling-append

export { setAlert, closeAlert };
