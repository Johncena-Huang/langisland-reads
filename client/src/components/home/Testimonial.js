import React, { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";
const Testimonial = () => {
  return (
    <Fragment>
      <ScrollAnimation animateIn="animate__slideInLeft" animateOnce={true}>
        <section id="testimonial" className=" text-center pt-3 mb-3 px-1">
          <div className="container-fluid block-1">
            <img
              src={require("./images/avatar-irene.jpg")}
              alt="avatar even"
              className="float-start"
            />

            <p>
              LangIsland is a great platform which provides amazing
              opportunities for us to interact with people of disparate
              backgrounds. On LangIsland, we’re able to not only improve our
              English fluency, but also absorb a variety of knowledge by
              exchanging opinions on intriguing issues with the other users. I
              highly recommend it to all of you!
            </p>
            <p className="member">- Irene Chen</p>
          </div>
        </section>
      </ScrollAnimation>
      <ScrollAnimation animateIn="animate__slideInRight" animateOnce={true}>
        <section id="testimonial" className=" text-center px-1 mb-3">
          <div className="container-fluid block-2">
            <img
              src={require("./images/avatar-jenny.jpg")}
              alt="avatar even"
              className="float-end"
            />
            <p>
              I joined this group for practicing English speaking skills in the
              beginning. A few months later, I realized that this is not only a
              place where I practice speaking English, but also a wonderland
              where I share many thoughts and ideas and make lots of friends.
              Don't hesitate to join us!
            </p>
            <p className="member">- Jenny Chien</p>
          </div>
        </section>
      </ScrollAnimation>
      <ScrollAnimation animateIn="animate__slideInLeft" animateOnce={true}>
        <section id="testimonial" className=" text-center pb-3 px-1 mb-5">
          <div className="container-fluid block-3">
            <img
              src={require("./images/avatar-even.jpg")}
              alt="avatar even"
              className="float-start"
            />
            <p>
              I was seeking for a practice opportunity at first when I knew
              here. However, I met a lot of amazing people here. They fulfill my
              life. I'm always so excited to begin the discussion about the most
              important fact happening nowaday with those who are openminded
            </p>
            <p className="member">- Even Pan</p>
          </div>
        </section>
      </ScrollAnimation>
    </Fragment>
  );
};

export default Testimonial;
