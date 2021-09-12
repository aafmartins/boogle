const router = require("express").Router();
const SavedBook = require("../models/SavedBook.model");

// //DELETE BOOKS
// router.get("/:id/delete", (req, res) => {
//     const id = req.params.id;
//     SavedBook.findByIdAndDelete(id)
//         .then((deletedBook) => {
//             res.redirect("/my-saved-books");
//         })
//         .catch((err) => console.log(err));
// });

// //BOOK DETAILS
// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     SavedBook.findById(id)
//         .then((book) => {
//             res.render("pages/saved-books/saved-book-details", {
//                 book: book
//             });
//         })
//         .catch((err) => console.log(err));
// });

// //DISPLAY ALL BOOKS
// router.get("/", (req, res) => {
//     SavedBook.find()
//         .then((books) => {
//             res.render("pages/saved-books/saved-book-list", {
//                 books: books
//             });
//         })
//         .catch((err) => console.log(err));
// });


module.exports = router;