//1 import packages and User model
const router = require("express").Router();
const Book = require("../models/Book.model");
// const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary");

//CREATE NEW BOOK
router.get("/new-book", (req, res) => {
  Book.find()
    .then((books) => {
      res.render("pages/user-books/new-book", { books: books });
    })
    .catch((err) => console.log(err));
});

router.post("/new-book", fileUploader.single("bookPictureUrl"), (req, res) => {
  const {
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    maturityRating,
  } = req.body;
  const bookPictureUrl = req.file.path;

  Book.create({
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    maturityRating,
    bookPictureUrl,
  })
    .then((newBook) => res.redirect("/books"))
    .catch((err) => {
      console.log(err);
      res.redirect("/new-book");
    });
});

//DELETE BOOKS
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((deletedBook) => {
      res.redirect("/books");
    })
    .catch((err) => console.log(err));
});

//EDIT BOOKS
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((book) => {
      console.log(book);
      res.render("pages/user-books/edit-book", { book });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  const id = req.params.id;
  const {
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    maturityRating,
  } = req.body;
  // const bookPictureUrl = req.file.path;

  Book.findByIdAndUpdate(id, {
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    maturityRating,
  })
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => console.log(err));
});

//BOOK DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((book) => {
      res.render("pages/user-books/book-details", { book: book });
    })
    .catch((err) => console.log(err));
});

//DISPLAY ALL BOOKS
router.get("/", (req, res) => {
  Book.find()
    .then((books) => {
      // console.log(books);
      res.render("pages/user-books/book-list", { books });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
