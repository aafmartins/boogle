const User = require("../models/User.model");
const router = require("express").Router();
const CreatedBook = require("../models/CreatedBook.model");
const SavedBook = require("../models/SavedBook.model");

//DISPLAY SAVED BOOKS BOOKSHELF
router.get("/my-saved-books", (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .populate("savedBooks")
      .then((result) => {
        console.log("What we're dealing with:", result.savedBooks);
        res.render("pages/saved-books/saved-book-list", {
          result: result.savedBooks,
        });
      })
      .catch((err) => console.log(err));
  } else res.redirect("/");
});

//DISPLAY CREATED BOOKS BOOKSHELF
router.get("/my-created-books", (req, res) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser);
    User.findById(req.session.currentUser._id)
      .populate("createdBooks")
      .then((result) => {
        console.log("What we're dealing with:", result.createdBooks);
        res.render("pages/user-books/my-book-list", {
          result: result.createdBooks,
        });
      })
      .catch((err) => console.log(err));
  } else res.redirect("/");
});

module.exports = router;
