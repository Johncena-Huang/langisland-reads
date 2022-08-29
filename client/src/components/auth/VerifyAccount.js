import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import Rotator from "../layout/Rotator";
import { verifyAccount } from "../../actions";
const VerifyAccount = ({ isAuthenticated, verifyAccount }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    verifyAccount(token);
    console.log("verify account component fired up!!!", token);
  }, []);
  const renderRotator = () => {
    if (isAuthenticated) {
      return (
        <Link to="/books">
          <Rotator size="10x" color="#78b6af" spin={false} />
        </Link>
      );
    } else {
      return <Rotator size="10x" color="#78b6af" spin={true} />;
    }
  };
  return <div className="my-auto text-center fadeIn">{renderRotator()}</div>;
};
const mapStateToPros = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToPros, { verifyAccount })(VerifyAccount);
