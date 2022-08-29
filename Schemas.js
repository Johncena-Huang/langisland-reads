const Joi = require("joi");

module.exports.bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    cover: Joi.string(),
    introduction: Joi.string().required(),
    summary: Joi.string().required(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().min(1).required(),
  }).required(),
});
