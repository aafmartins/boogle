const User = require("../models/User.model");
const router = require("express").Router();
const CreatedBook = require("../models/CreatedBook.model");
const SavedBook = require("../models/SavedBook.model");

const isLoggedIn = require("../middleware/isLoggedIn");

//DISPLAY SAVED BOOKS BOOKSHELF
router.get("/my-saved-books", isLoggedIn, (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .populate("savedBooks")
      .then((result) => {
        res.render("pages/saved-books/saved-book-list", {
          result: result.savedBooks,
          style: "Bookshelves/list.css"
        });
      })
      .catch((err) => console.log(err));
  } else res.redirect("/");
});

//DISPLAY CREATED BOOKS BOOKSHELF
router.get("/my-created-books", isLoggedIn, (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .populate("createdBooks")
      .then((result) => {
        res.render("pages/user-books/my-book-list", {
          result: result.createdBooks,
          style: "Bookshelves/list.css"
        });
      })
      .catch((err) => console.log(err));
  } else res.redirect("/");
});

module.exports = router;