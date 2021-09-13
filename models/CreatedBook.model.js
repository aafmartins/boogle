const { Schema, model } = require("mongoose");

const createdBookSchema = new Schema({
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

const CreatedBook = model("CreatedBook", createdBookSchema);

module.exports = CreatedBook;
