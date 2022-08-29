import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  LOAD_USER,
  UPDATE_USER,
} from "../actions/types";
const initialState = {
  user: {},
  isAuthenticated: false,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
    case UPDATE_USER:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        isAuthenticated: payload ? true : false,
      };
    }
    case LOGOUT: {
      return { ...state, user: null, isAuthenticated: false };
    }
    default:
      return state;
  }
};
