import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT } from "./types";

export const setAlert =
  (alertType, message, status, timeout = 1500) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: alertType,
      payload: { status, message, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export const closeAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
