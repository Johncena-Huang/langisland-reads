import React, { useState } from "react";

const OuterComment = ({ children, userPhoto }) => {
  const [reply, setReply] = useState(false);
  return (
    <div className="comment d-flex position-relative">
      <img
        src={userPhoto}
        alt="profile photo"
        className="profile rounded-circle"
      />
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { reply, setReply });
      })}
    </div>
  );
};

export default OuterComment;
