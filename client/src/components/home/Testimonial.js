import React, { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";
const testimonials = [
  {
    name: "Irene Chen",
    content:
      "LangIsland is a great platform which provides amazing opportunities for us to interact with people of disparate backgrounds. On LangIsland, we’re able to not only improve our English fluency, but also absorb a variety of knowledge by exchanging opinions on intriguing issues with the other users. I highly recommend it to all of you!",
    img: require("./images/avatar-irene.jpg"),
  },
  {
    name: "Jenny Chien",
    content:
      "I joined this group for practicing English speaking skills in the beginning. A few months later, I realized that this is not only a place where I practice speaking English, but also a wonderland where I share many thoughts and ideas and make lots of friends. Don't hesitate to join us!",
    img: require("./images/avatar-jenny.jpg"),
  },
  {
    name: "Even Pan",
    content:
      "I was seeking for a practice opportunity at first when I knew here. However, I met a lot of amazing people here. They fulfill my life. I'm always so excited to begin the discussion about the most important fact happening nowaday with those who are openminded",
    img: require("./images/avatar-even.jpg"),
  },
];

const Testimonial = () => {
  return (
    <Fragment>
      {testimonials.map(({ name, content, img }, index) => (
        <ScrollAnimation
          animateIn={
            index % 2 === 0 ? "animate__slideInLeft" : "animate__slideInRight"
          }
          animateOnce={true}
          key={index}
        >
          <section id="testimonial" className=" text-center pt-3 mb-3 px-1">
            <div className="container-fluid block-1">
              <img
                src={img}
                alt={name}
                className={
                  index % 2 === 0
                    ? "float-md-start float-none"
                    : "float-md-end float-none"
                }
              />
              <p>{content}</p>
              <p className="member">- {name}</p>
            </div>
          </section>
        </ScrollAnimation>
      ))}
    </Fragment>
  );
};

export default Testimonial;
