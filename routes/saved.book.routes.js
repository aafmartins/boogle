const router = require("express").Router();
const SavedBook = require("../models/SavedBook.model");

//DELETE BOOKS SAVED FROM API
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  SavedBook.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/bookshelf/my-saved-books");
    })
    .catch((err) => console.log(err));
});

//DISPLAY DETAILS OF BOOKS SAVED FROM API
router.get("/:id", (req, res) => {
  const id = req.params.id;
  SavedBook.findById(id)
    .then((book) => {
      res.render("pages/saved-books/saved-book-details", {
        book: book,
        style: "Bookshelves/details.css"
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;