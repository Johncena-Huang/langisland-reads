import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
const Rotator = ({ size, color, spin }) => {
  return (
    <FontAwesomeIcon style={{ color }} size={size} icon={faSync} spin={spin} />
  );
};

export default Rotator;
