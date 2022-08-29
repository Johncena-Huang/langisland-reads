import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SeeMoreModal from "./SeeMoreModal";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { updateBookLikes } from "../../actions";
const BookItemLikes = ({
  auth: { user },
  book: { _id, likes },
  updateBookLikes,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onLikeClick = () => {
    updateBookLikes(_id);
  };
  const renderLikes = () => {
    if (user && likes.some((like) => like._id === user._id)) {
      return (
        <>
          <Button variant="secondary" onClick={onLikeClick}>
            <FontAwesomeIcon icon={faThumbsUp} />
            &nbsp;Liked&nbsp;
            <span id="like-count">{likes.length}</span>
          </Button>
          <Button className="mx-1" variant="outline-dark" onClick={handleShow}>
            See more
          </Button>
        </>
      );
    } else if (user) {
      return (
        <>
          <Button varient="primary" onClick={onLikeClick}>
            <FontAwesomeIcon icon={faThumbsUp} />
            &nbsp;Like&nbsp;
            <span id="like-count">{likes.length}</span>
          </Button>
          <Button className="mx-1" variant="outline-dark" onClick={handleShow}>
            See more
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button varient="secondary" disabled>
            <FontAwesomeIcon icon={faThumbsUp} />
            &nbsp;Like&nbsp;
            <span id="like-count">{likes.length}</span>
          </Button>
          <Button className="mx-1" variant="outline-dark" disabled>
            See more
          </Button>
        </>
      );
    }
  };
  return (
    <div className="mt-3">
      {renderLikes()}
      <SeeMoreModal likes={likes} show={show} handleClose={handleClose} />
    </div>
  );
};
const mapStateToPros = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, { updateBookLikes })(BookItemLikes);
