const { Schema, model } = require("mongoose");

const createdBookSchema = new Schema({
  title: String,
  authors: [String],
  publishedDate: Date,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],
  maturityRating: String,
});

const CreatedBook = model("Book", createdBookSchema);

module.exports = CreatedBook;
