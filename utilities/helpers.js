const User = require("../models/user");
// Require moment.js
const moment = require("moment");
// This function sets up the ability to allow a user to set the url for the email handler.
exports.setUrl = (request, route, params) => {
  return `${request.protocol}://${request.headers.host}/${route}/${params}`;
};

exports.checkIfNotVerified = async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return next();
  if (user && !user.isVerified) {
    req.flash(
      "error",
      `Your account is not active. Check your email to verify your account`
    );
    return res.redirect("/campgrounds");
  }
  return next();
};

exports.addPageName = function (results) {
  const updatedResults = results.reduce((prev, cur, index) => {
    if (cur["parent"]["type"] === "page_id") {
      const id = cur.id.replace(/-/g, "");
      const regex = new RegExp(`(?<=https://www.notion.so/)(.*)(?=-${id})`);
      const name = cur.url.match(regex)[0];
      cur.pageName = name;
      prev.push(cur);
    }
    return prev;
  }, []);
  return updatedResults;
};
exports.formulateDate = function (createAt) {
  let _date = moment(createAt);
  let now = moment();
  if (_date.isValid()) {
    let days = now.diff(_date, "days"),
      months = now.diff(_date, "month");
    if (days >= 7 && months == 0) {
      let weeks = now.diff(_date, "weeks"),
        number = weeks > 1 ? "weeks" : "week";
      return `${weeks} ${number} ago`;
    }
    return _date.fromNow();
  }
  return createAt;
};

module.exports.serializeUser = (user) => {
  const { firstName, lastName, _id } = user;
  return { firstName, lastName, _id };
};
