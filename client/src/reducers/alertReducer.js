import { ALERT_SUCCESS, ALERT_FAILURE, REMOVE_ALERT } from "../actions/types";
// const initialState = {
//   message: "",
//   status: "",
//   show: false,
// };
const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT_SUCCESS:
    case ALERT_FAILURE: {
      return [...state, payload];
    }
    case REMOVE_ALERT: {
      return state.filter((alert) => alert.id !== payload);
    }
    default: {
      return state;
    }
  }
};

// switch (type) {
//   case ALERT_SUCCESS:
//   case ALERT_FAILURE: {
//     return { ...payload, show: true };
//   }
