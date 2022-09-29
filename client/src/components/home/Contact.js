import React from "react";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center pt-md-5 pt-0">
        <img src="/logo-bottom.jpg" alt="logo-bottom" className="logo-bottom" />
        <div className="contact-info lh-lg text-center text-md-start">
          <p style={{ fontSize: "24px", marginBottom: "0" }}>
            LangIsland - Then I learn
          </p>
          <p style={{ fontSize: "20px" }}>Start your LangIsland today!</p>
        </div>
        <div className="contact-email">
          <h4 className="text-center">Contact Us</h4>
          <a
            href="mailto:service@langisland.com"
            className="text-decoration-none"
          >
            service@langisland.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
