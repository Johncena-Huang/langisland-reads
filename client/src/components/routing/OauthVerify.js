import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions";
const OauthVerify = ({ component: Component, isAuthenticated, loadUser }) => {
  if (!isAuthenticated) loadUser();
  return <Component />;
};
const mapStateToPros = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToPros, { loadUser })(OauthVerify);
