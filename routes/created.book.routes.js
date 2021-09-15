//1 import packages and User model
const User = require("../models/User.model");
const CreatedBook = require("../models/CreatedBook.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary");

const isLoggedIn = require("../middleware/isLoggedIn");

//CREATE NEW BOOK
router.route("/new-book")
  .get(isLoggedIn, (req, res) => {
    CreatedBook.find()
      .then((books) => {
        res.render("pages/user-books/new-book", {
          books: books,
          style: "Create-Book/display.css"
        });
      })
      .catch((err) => console.log(err));
  })
  .post(fileUploader.single("bookPictureUrl"), (req, res) => {
    const {
      title,
      authors,
      publishedDate,
      description,
      pageCount,
      categories
    } =
    req.body;
    const bookPictureUrl = req.file.path;
    const user = req.session.currentUser;

    CreatedBook.create({
        title,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        bookPictureUrl,
        user,
      })
      .then((newBook) => {
        User.findByIdAndUpdate(user._id, {
            $push: {
              createdBooks: newBook,
            },
          })
          .then((updatedUser) => {
            res.redirect("/bookshelf/my-created-books");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        res.redirect("/new-book");
      });
  });

//DELETE BOOKS
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  CreatedBook.findByIdAndDelete(id)
    .then((deletedBook) => {
      res.redirect("/bookshelf/my-created-books");
    })
    .catch((err) => console.log(err));
});



//EDIT BOOKS
router.route("/:id/edit")
  .get((req, res) => {
    const id = req.params.id;

    CreatedBook.findById(id)
      .then((book) => {
        res.render("pages/user-books/edit-book", {
          book,
          style: "Bookshelves/edit.css"
        });
      })
      .catch((err) => console.log(err));
  })

  .post((req, res) => {
    const id = req.params.id;
    const {
      title,
      authors,
      publishedDate,
      description,
      pageCount,
      categories
    } =
    req.body;
    // const bookPictureUrl = req.file.path;

    CreatedBook.findByIdAndUpdate(id, {
        title,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
      })
      .then(() => {
        res.redirect(`/books/${id}`);
      })
      .catch((err) => console.log(err));
  });

//BOOK DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  CreatedBook.findById(id)
    .then((book) => {
      res.render("pages/user-books/book-details", {
        book: book,
        style: "Bookshelves/details.css"
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;