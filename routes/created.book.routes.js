//import packages and User model, created book model
const User = require("../models/User.model");
const CreatedBook = require("../models/CreatedBook.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary");

// imports function
const isLoggedIn = require("../middleware/isLoggedIn");

//CREATE NEW BOOK
router
  .route("/new-book")
  //THIS GET RENDERS THE FORM TO CREATE NEW BOOK
  .get(isLoggedIn, (req, res) => {
    CreatedBook.find()
      .then((books) => {
        res.render("pages/user-books/new-book", {
          books: books,
          style: "Create-Book/display.css",
        });
      })
      .catch((err) => console.log(err));
  })
  //THIS POST RECEIVES INFO FROM FORM AND CREATES NEW BOOK
  .post(fileUploader.single("bookPictureUrl"), (req, res) => {
    const {
      title,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
    } = req.body;
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
      })
      .then((newBook) => {
        User.findByIdAndUpdate(user._id, {
            $push: {
              createdBooks: newBook,
            },
          })
          .then(() => {
            res.redirect("/bookshelf/my-created-books");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        res.redirect("/new-book");
      });
  });

//THIS GET METHOD ENABLES USER TO DELETE BOOKS
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  CreatedBook.findByIdAndDelete(id)
    .then((deletedBook) => {
      res.redirect("/bookshelf/my-created-books");
    })
    .catch((err) => console.log(err));
});


router
  .route("/:id/edit")
  //THIS GET METHOD RENDERS THE EDIT BOOK PAGE
  .get((req, res) => {
    const id = req.params.id;
    CreatedBook.findById(id)
      .then((book) => {
        res.render("pages/user-books/edit-book", {
          book,
          style: "Bookshelves/edit.css",
        });
      })
      .catch((err) => console.log(err));
  })
  //THIS POST METHOD ENABLES USER TO EDIT BOOKS
  .post((req, res) => {
    const id = req.params.id;
    const {
      title,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
    } = req.body;


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

//THIS GET METHOD RENDERS BOOK DETAILS PAGE
router.get("/:id", (req, res) => {
  CreatedBook.findById(req.params.id)
    .then((book) => {
      res.render("pages/user-books/book-details", {
        book: book,
        style: "Bookshelves/details.css",
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;