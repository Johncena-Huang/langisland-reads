import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAlert } from "../../actions";
import { ALERT_FAILURE } from "../../actions/types";
const PrivateRoute = ({ component: Component, isAuthenticated, setAlert }) => {
  if (!isAuthenticated) {
    setAlert(ALERT_FAILURE, "Please login first", "failure");
    return <Navigate to="/login" />;
  }
  return <Component />;
};
const mapStateToPros = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToPros, { setAlert })(PrivateRoute);
