//IMPORT PACKAGES AND SAVED BOOKS MODEL
const router = require("express").Router();
const SavedBook = require("../models/SavedBook.model");

//THIS GET METHOD DELETES BOOKS SAVED FROM API AND REDIRECTS TO SAVED BOOKSHELF
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  SavedBook.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/bookshelf/my-saved-books");
    })
    .catch((err) => console.log(err));
});

//THIS GET DISPLAYS DETAILS OF BOOKS SAVED FROM API AND RENDERS SAVED BOOKS DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  SavedBook.findById(id)
    .then((book) => {
      res.render("pages/saved-books/saved-book-details", {
        book: book,
        style: "Bookshelves/details.css",
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
