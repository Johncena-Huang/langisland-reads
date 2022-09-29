import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import ShowCase from "./ShowCase";
import Testimonial from "./Testimonial";
import SignUp from "./SignUp";
import Contact from "./Contact";
import BookCarousel from "./BookCarousel";
import "animate.css/animate.min.css";
import "./Home.css";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchBestSellers = await axios.get(
        "https://api.nytimes.com/svc/books/v3/lists.json",
        {
          params: {
            list: "hardcover-fiction",
            "api-key": "e2cQrRj7rljKG4FMoijQ7EWLGVJTR7sb",
          },
        }
      );
      const bestSellerList = fetchBestSellers.data.results.map((result) => {
        return {
          isbn: result["book_details"][0]["primary_isbn10"],
          bookUrl: result["amazon_product_url"],
        };
      });
      const bookList = await Promise.all(
        bestSellerList.map(async ({ isbn, bookUrl }, index) => {
          try {
            const fetchBook = await axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            );
            const imgUrl =
              fetchBook.data["items"][0]["volumeInfo"]["imageLinks"][
                "thumbnail"
              ];
            return { isbn, bookUrl, imgUrl };
          } catch (err) {
            return { isbn, bookUrl, imgUrl: "/book-placeholder.png" };
          }
        })
      );
      setBooks(bookList);
      setLoading(false);
    };
    fetchBooks();
  }, []);
  return loading ? (
    <Spinner animation="border" style={{ color: "#78b6af" }} />
  ) : (
    <div className="home-page ">
      <div className="container-fluid">
        <ShowCase />
        <BookCarousel bookCollection={books} />
        <Testimonial />
        <SignUp />
      </div>
      <Contact />
    </div>
  );
};
export default Home;

// *** react-animate-on-scroll(should install animate.css) → recommended
// *** react-scroll → caanot "reset" animation only shows up once when scrolled into view
// *** scrollReveal → vanilla javascript
// Hooking up to new york times api and google book api
// https://medium.com/free-code-camp/build-a-best-sellers-list-with-new-york-times-google-books-api-46201c30aec7
