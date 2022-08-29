const { bookSchema, commentSchema } = require("./Schemas.js");
const Book = require("./models/book.js");
const Comment = require("./models/comment.js");
const Subcomment = require("./models/subcomment.js");
const ExpressError = require("./utilities/ExpressError.js");
const axios = require("axios");
const fs = require("fs");
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});
module.exports.validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.isAuthorizedByNotion = async (req, res, next) => {
  if (req.session.notionToken && req.query.notionId) {
    const { notionId } = req.query;
    const notion = new Client({
      auth: req.session.notionToken,
    });
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdblocks = await n2m.pageToMarkdown(notionId);
    const mdString = n2m.toMarkdownString(mdblocks);
    const markdown = JSON.stringify(md.render(mdString));
    return res.send(markdown);
  } else {
    return next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book.poster.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/books/${id}`);
  }
  next();
};
module.exports.isCmtAuthor = async (req, res, next) => {
  const { id, cmtId } = req.params;
  const comment = await Comment.findById(cmtId);
  if (!comment.poster.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/books/${id}`);
  }
  next();
};
module.exports.isSubcmtAuthor = async (req, res, next) => {
  const { id, cmtId, subcmtId } = req.params;
  const subcomment = await Subcomment.findById(subcmtId);
  if (!subcomment.poster.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/books/${id}`);
  }
  next();
};
/*
 ***Important concept
(1.) When we are browsing the webpage, what we are doing essentially is "come from one request to another".
The simplest way to make each request stateful is by deploying "session"
(2.) The bug regarding req.session.returnTo = req.originalUrl declared in "isLoggedIn" middleware
→ Only the last visited protected path will be stored in the session(req.session.returnTo) and if we come from 
open route, we will be taken to the last visited protected route after login
→ Solution: move this line of code to middleware for every incoming request
*/
