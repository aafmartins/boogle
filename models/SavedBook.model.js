const { Schema, model } = require("mongoose");

const savedBookSchema = new Schema({
  title: String,
  authors: [String],
  publishedDate: Date,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const SavedBook = model("SavedBook", savedBookSchema);

module.exports = SavedBook;
