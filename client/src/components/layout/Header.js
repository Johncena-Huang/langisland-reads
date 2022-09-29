// rafce
import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = ({ isAuthenticated, logout }) => {
  const renderUser = () => {
    return (
      <div className="d-flex align-items-center">
        <LinkContainer to="/profile" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faUser} size="2x" inverse />
        </LinkContainer>
        <Button onClick={logout} className="my-2 mx-3 my-lg-0" variant="danger">
          Logout
        </Button>
      </div>
    );
  };
  const renderVisitingUser = () => {
    return (
      <div className="d-flex align-items-center">
        <LinkContainer to="/login">
          <Button className="me-2 my-2 my-lg-0" variant="danger">
            Login
          </Button>
        </LinkContainer>
        <LinkContainer to="/register">
          <Button className="me-2 my-2 my-lg-0" variant="success">
            Register
          </Button>
        </LinkContainer>
      </div>
    );
  };
  return (
    <Navbar
      style={{
        backgroundColor: "#78b6af",
        height: "91px",
        zIndex: 2,
      }}
      expand="lg"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo.png"
              width="140"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <div
          className="order-0 order-lg-1 ms-auto"
          style={{ maxWidth: "fit-content" }}
        >
          {isAuthenticated ? renderUser() : renderVisitingUser()}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            backgroundColor: "#78b6af",
            margin: "0 -12px",
            paddingLeft: "20px",
          }}
        >
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/books">
              <Nav.Link>Book Summaries</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/books/new">
              <Nav.Link href="">New Summaries</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapStateToPros = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
// Reference https://medium.com/how-to-react/use-react-router-link-with-bootstrap-315a8b88e129
export default connect(mapStateToPros, { logout })(Header);
