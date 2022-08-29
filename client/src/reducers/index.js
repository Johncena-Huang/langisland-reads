import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import booksReducer from "./booksReducer";
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  books: booksReducer,
});
