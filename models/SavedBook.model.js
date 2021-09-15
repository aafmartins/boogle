const { Schema, model } = require("mongoose");

const savedBookSchema = new Schema({
  title: String,
  authors: [String],
  publishedDate: String,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],
});

const SavedBook = model("SavedBook", savedBookSchema);

module.exports = SavedBook;
