// MODEL FOR SAVED BOOKS
const {
  Schema,
  model
} = require("mongoose");

const savedBookSchema = new Schema({
    title: String,
    authors: [String],
    publishedDate: String,
    description: String,
    bookPictureUrl: String,
    pageCount: Number,
    categories: [String],

  },

  {
    timestamps: true
  }
);

const SavedBook = model("SavedBook", savedBookSchema);

module.exports = SavedBook;