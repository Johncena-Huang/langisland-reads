import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  faGithub,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const About = () => {
  return (
    <div className="container my-auto py-5" style={{ maxWidth: "1200px" }}>
      <div className="row">
        <div className="col-10 offset-1 d-flex flex-lg-row flex-column align-items-center">
          <div
            className="text-box ps-3 order-last order-lg-first"
            style={{ maxWidth: "60ch" }}
          >
            <h1 className="h1 text-lg-start text-center about-title">
              About Me
            </h1>
            <p className="text-muted about-text h4">
              My name is John Huang, currently based in Taipei, Taiwan. This is
              my first full-stack MERN(MongoDB, Express, React, Node) project
              built up from scratch. My journey into web development began in
              the first half of 2022 as an absolute beginner. I am a self-taught
              developer via various online resources and I felt delighted after
              months of struggles and finally brought this project to an end.
            </p>
            <div>
              <a href="https://www.w3schools.com" target="_blank">
                <FontAwesomeIcon className="me-2" icon={faGithub} size="2x" />
              </a>
              <a href="https://www.w3schools.com" target="_blank">
                <FontAwesomeIcon className="me-2" icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.w3schools.com" target="_blank">
                <FontAwesomeIcon className="me-2" icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
          <div
            className="img-box order-first order-lg-last"
            style={{ maxWidth: "60ch" }}
          >
            <LazyLoadImage
              src={require("./about-photo.jpg")}
              alt="about-photo"
              style={{
                height: "360px",
                width: "max-content",
                objectFit: "contain",
              }}
              className="img-fluid"
              effect="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

/* Two ways to center column
(1.) add "offset" on the "column"
(2.) add "justify-content-center" on "row"
*/

/* <img
    style={{
      height: "360px",
      width: "max-content",
      objectFit: "contain",
    }}
    className="img-fluid"
    src={require("./about-photo.jpg")}
    alt="about-photo"
  /> */
