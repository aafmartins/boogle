const {
    Schema,
    model
} = require("mongoose");

const savedBookSchema = new Schema({
    title: String,
    authors: [String],
    publishedDate: Date,
    description: String,
    bookPictureUrl: String,
    pageCount: Number,
    categories: [String],
    maturityRating: String,
});

const SavedBook = model("SavedBook", savedBookSchema);

module.exports = SavedBook;