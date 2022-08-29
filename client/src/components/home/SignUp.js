import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

const SignUp = () => {
  return (
    <section id="sign-up" className=" mb-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 col-sm-7"></div>
          <div className="col-md-5 col-sm-5 sign-up-right mx-auto text-center">
            <ScrollAnimation animateIn="animate__slideInRight">
              <h2>Do you want to join us?</h2>
              <p>You will receive a form for registration in the email!</p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient's email address"
                  aria-label="Recipient's email address"
                  aria-describedby="button-join"
                />
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  id="button-join"
                >
                  Join
                </button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
