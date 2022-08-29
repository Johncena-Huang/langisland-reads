import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./actions";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Register from "./components/auth/Register";
import AlertMessage from "./components/layout/AlertMessage";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyAccount from "./components/auth/VerifyAccount";
import BookGallery from "./components/books/BookGallery";
import BookForm from "./components/book-form/BookForm";
import Book from "./components/book/Book";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import ScrollToTop from "./components/routing/ScrollToTop";
import OauthVerify from "./components/routing/OauthVerify";
import history from "./history";

class App extends Component {
  // componentDidMount() {
  //   this.props.loadUser();
  // }
  render() {
    return (
      <HistoryRouter history={history}>
        <Header />
        <AlertMessage />
        <ScrollToTop />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/books"
            element={<OauthVerify component={BookGallery} />}
          />
          <Route path="/books/:id" element={<Book />} />
          <Route
            path="/books/:id/edit"
            element={<PrivateRoute key="edit-book" component={BookForm} />}
          />
          <Route
            path="/books/new"
            element={<PrivateRoute key="add-book" component={BookForm} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-account/token" element={<VerifyAccount />} />
        </Routes>
        <Footer />
      </HistoryRouter>
    );
  }
}

export default connect(null, { loadUser })(App);

// how to scroll to top automatically on every transition?
// ans → https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition

// using the same component for different route path
// ans → https://stackoverflow.com/questions/49001001/using-same-component-for-different-route-path-in-react-router-v4
