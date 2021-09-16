//import packages, API, User model, Saved Book model
const GoogleBookApi = require("../service/index");
const useBooksApiHandler = new GoogleBookApi();
const SavedBook = require("../models/SavedBook.model");
const User = require("../models/User.model");
const router = require("express").Router();

// IMPRT FUCTIONS
const isLoggedIn = require("../middleware/isLoggedIn");
const buildQuery = require("../utilityFunctions/buildQuery");

//THIS GET METHOD DELIVERS THE BOOK SEARCH AND DISPLAY THE INFORMATION
router.get("/book-search", (req, res, next) => {
  const {
    title,
    author,
    generic,
    genre
  } = req.query;
  // BUILDING QUERY FOR SEARCH FORM
  let query = buildQuery(title, author, generic, genre);
  // RANDOM SEARCH NAME GENERATOR
  const listOfWords = [
    "love",
    "passion",
    "happy",
    "travel",
    "rick roll",
    "crime",
    "art",
    "detective",
    "sad",
    "haruki",
    "agatha"
  ];
  let randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];

  // SETTING UP QUERY
  const params = {
    q: query || randomWord,
    key: process.env.BOOKAPI,
    maxResults: 20,
    langRestrict: "en",
    printType: "books",
  };


  useBooksApiHandler
    .getAllBooks(params)
    .then((result) => {
      res.render("pages/search/search-results", {
        books: result,
        style: "Search-Result/list.css",
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    });
});

//BOOK DETAILS
router.route("/:id")
  //THIS GET METHOD RENDERS BOOKS DETAILS IF A USER IS LOGGED IN
  .get(isLoggedIn, (req, res) => {
    const id = req.params.id;
    useBooksApiHandler
      .getBookById(id)
      .then((book) => {
        res.render("pages/search/search-book-detail", {
          book: book.data.volumeInfo,
          bookId: book.data.id,
          style: "Search-Result/details.css",
        });
      })
      .catch((err) => console.log(err));
  })
  //THIS POST METHOD RECEIVES INFORMATION FROM FORM TO CREATE NEW SAVED BOOK
  .post((req, res) => {
    useBooksApiHandler
      .getBookById(req.params.id)
      .then((result) => {
        const book = result.data.volumeInfo;
        const user = req.session.currentUser;
        const {
          title = "Not available",
            authors = ["No authors known"],
            publishedDate = "",
            description,
            pageCount,
            categories = ["No category available"],
        } = book;
        const bookPictureUrl = book.imageLinks.thumbnail;

        SavedBook.create({
            title,
            authors,
            publishedDate,
            description,
            bookPictureUrl,
            pageCount,
            categories,
          })
          .then((savedBook) => {
            User.findByIdAndUpdate(user._id, {
                $push: {
                  savedBooks: savedBook._id,
                },
              })
              .then(() => res.redirect("/bookshelf/my-saved-books"))
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log("was not able to add a new book to collection");
          });
      })
      .catch((err) => {
        console.log("was not able to get info of book:" + err);
      });
  });

module.exports = router;