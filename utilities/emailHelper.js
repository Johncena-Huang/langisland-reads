const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ejs = require("ejs");
const { convert } = require("html-to-text");
module.exports = class Email {
  // URL is the link for verifying the account
  constructor(user, url) {
    this.to = user.email;
    this.username = user.firstName + " " + user.lastName;
    this.url = url;
    this.from = `${process.env.NAME} <${process.env.EMAIL_FROM}>`;
  }
  async send(template, subject) {
    try {
      // Create the email body, which needs username, verifying URL and subject
      const html = await ejs.renderFile(
        `${__dirname}/../views/emails/${template}.ejs`,
        {
          username: this.username,
          url: this.url,
          subject,
        }
      );
      // Writing the email to be sent
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };
      await sgMail.send(mailOptions);
    } catch (err) {
      console.dir(err);
    }
  }
  async sendWelcome(title) {
    await this.send("welcome", `welcome to ${title}`);
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
  async sendPasswordChange() {
    await this.send("passwordChanged", "Your password has been changed");
  }
};
