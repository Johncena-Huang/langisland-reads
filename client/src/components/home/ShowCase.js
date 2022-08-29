import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ShowCase = () => {
  return (
    <section id="showcase" className="pt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <ScrollAnimation
              animateIn="animate__slideInDown"
              animateOnce={true}
            >
              <div className="showcase-left">
                <LazyLoadImage
                  alt="book-image"
                  src={require("./images/book-image.jpg")}
                  effect="blur"
                />
              </div>
            </ScrollAnimation>
          </div>
          <div className="col-md-6 col-sm-6">
            <ScrollAnimation
              animateIn="animate__slideInRight"
              animateOnce={true}
              delay={500}
            >
              <div className="showcase-right">
                <h1>Greatness is consistency...</h1>
                <p>
                  " Exercising today is simple. Training every week is simply
                  remarkable. Reading one book rarely matters. Reading every day
                  is a superpower. Unheroic days can make for heroic decades." -
                  James Clear, author of Atomic Habits
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;

/* <img
      className="d-block mx-auto"
      src={require("./images/book-image.jpg")}
      alt="book-image"
    /> */
