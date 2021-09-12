const {
  Schema,
  model
} = require("mongoose");

const bookSchema = new Schema({
  title: String,
  authors: [String],
  publishedDate: Date,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],
  maturityRating: String,
});

const Book = model("Book", bookSchema);

module.exports = Book;