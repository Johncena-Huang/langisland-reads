import React from "react";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container-fluid d-flex justify-content-between align-items-center pt-5">
        <img src="/logo-bottom.jpg" alt="logo-bottom" className="logo-bottom" />
        <div className="contact-info lh-lg">
          <h3>LangIsland - Then I learn</h3>
          <p>Start your LangIsland today!</p>
          <div className="social-media">
            <a href="https://www.facebook.com/langisland.club">
              <i className="fab fa-facebook-square fa-2x mx-1"></i>
            </a>
            <a href="https://line.me/R/ti/p/%40774fzqsw">
              <i className="fab fa-line fa-2x mx-1"></i>
            </a>
            <a href="https://www.instagram.com/langisland.club/">
              <i className="fab fa-instagram-square fa-2x mx-1"></i>
            </a>
          </div>
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
