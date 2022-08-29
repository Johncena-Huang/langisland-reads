const passport = require("passport");
const axios = require("axios");
const { addPageName } = require("../utilities/helpers");
exports.loadGoogleLogin = async (req, res, next) => {
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })(req, res, next);
};

exports.googleRegisterOrLogin = async (req, res, next) => {
  // req.flash("success", "welcome back");
  res.redirect("/books");
};

exports.notionAuthenticate = (req, res) => {
  res.redirect(
    `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NOTION_CLIENTID}&response_type=code`
  );
};

exports.notionHandleCallback = async (req, res) => {
  const { code } = req.query;
  const resp = await axios({
    method: "POST",
    url: "https://api.notion.com/v1/oauth/token",
    auth: {
      username: process.env.NOTION_CLIENTID,
      password: process.env.NOTION_CLIENT_SECRET,
    },
    headers: { "Content-Type": "application/json" },
    data: { code, grant_type: "authorization_code" },
  });
  req.session.notionToken = resp.data.access_token;
  const { data } = await axios({
    method: "POST",
    url: "https://api.notion.com/v1/search",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resp.data.access_token}`,
      "Notion-Version": "2022-02-22",
    },
    data: { filter: { property: "object", value: "page" } },
  });
  res.render("notion/pagePicker", {
    pages: addPageName(data.results),
    domain: process.env.DOMAIN,
  });
};
