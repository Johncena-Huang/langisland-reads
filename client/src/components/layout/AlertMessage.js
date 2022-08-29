import React from "react";
import Alert from "react-bootstrap/Alert";
import { closeAlert } from "../../actions";
import { connect } from "react-redux";
const AlertMessage = ({ alerts, closeAlert }) => {
  const renderAlertMessage = () => {
    return alerts.map((alert) => {
      return (
        <Alert
          key={alert.id}
          className="text-center sticky-top"
          onClose={() => closeAlert(alert.id)}
          variant={alert.status === "success" ? "success" : "danger"}
          dismissible
        >
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      );
    });
  };
  // const renderFailureMessage = () => {
  //   return (
  //     <Alert
  //       className="text-center"
  //       variant="danger"
  //       onClose={() => closeAlert()}
  //       dismissible
  //     >
  //       <Alert.Heading>{alert.message}</Alert.Heading>
  //     </Alert>
  //   );
  // };
  // const renderSuccessMessage = () => {
  //   return (
  //     <Alert
  //       className="text-center"
  //       variant="success"
  //       onClose={() => closeAlert()}
  //       dismissible
  //     >
  //       <Alert.Heading>{alert.message}</Alert.Heading>
  //     </Alert>
  //   );
  // };
  // if (alert.status === "failure" && alert.show) {
  //   return renderFailureMessage();
  // } else if (alert.status === "success" && alert.show) {
  //   return renderSuccessMessage();
  // } else {
  //   return;
  // }
  return <>{renderAlertMessage()}</>;
};
const mapStateToPros = (state) => {
  return { alerts: state.alerts };
};
export default connect(mapStateToPros, { closeAlert })(AlertMessage);
