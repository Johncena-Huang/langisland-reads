import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ShowCase = () => {
  return (
    <section id="showcase" className="pt-5 d-flex">
      <div className="row my-auto">
        <div className=" col-md-6 d-flex justify-content-center align-items-center">
          <ScrollAnimation animateIn="animate__slideInDown" animateOnce={true}>
            <div className="showcase-left ">
              <LazyLoadImage
                alt="book-image"
                src={require("./images/book-image.jpg")}
                effect="blur"
                wrapperClassName="d-flex d-md-block justify-content-center"
              />
            </div>
          </ScrollAnimation>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <ScrollAnimation
            animateIn="animate__slideInRight"
            animateOnce={true}
            delay={500}
          >
            <div className="showcase-right">
              <h1 className="mt-3 mt-md-0">Greatness is consistency...</h1>
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
    </section>
  );
};

export default ShowCase;

/* <img
      className="d-block mx-auto"
      src={require("./images/book-image.jpg")}
      alt="book-image"
    /> */
