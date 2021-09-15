const { Schema, model } = require("mongoose");

const createdBookSchema = new Schema({
  title: String,
  authors: [String],
  publishedDate: String,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],
});

const CreatedBook = model("CreatedBook", createdBookSchema);

module.exports = CreatedBook;
