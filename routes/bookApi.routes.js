const GoogleBookApi = require("../service/index");
const useBooksApiHandler = new GoogleBookApi();
const SavedBook = require("../models/SavedBook.model");
const User = require("../models/User.model");
const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/book-search", (req, res, next) => {
  const {
    title,
    author,
    generic,
    genre
  } = req.query;

  let query = ``;

  function checkAppend(string) {
    // return string === "" ? string : string + '+'
    // [title, author, generic].join('+')
    if (string !== "") {
      string += "+";
    }
  }

  if (title) {
    query += `intitle:${title}`;
  }
  if (author) {
    checkAppend(query);
    query += `inauthor:${author}`;
  }
  if (generic) {
    checkAppend(query);
    query += `ingeneric:${generic}`;
  }
  if (genre) {
    checkAppend(query);
    query += `ingenre:${genre}`;
  }

  const params = {
    q: query || "old",
    key: process.env.BOOKAPI,
    maxResults: 20,
    langRestrict: "en",
    printType: "books",
  };

  useBooksApiHandler
    .getAllBooks(params)
    .then((result) => {
      // console.log("yayya", params);
      // console.log(result.data.items[0].volumeInfo);
      res.render("pages/search/search-results", {
        books: result,
        style: "Search-Result/list.css"
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    });
});

//BOOK DETAILS
router.get("/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  useBooksApiHandler
    .getBookById(id)
    .then((book) => {
      res.render("pages/search/search-book-detail", {
        book: book.data.volumeInfo,
        bookId: book.data.id,
        style: "Search-Result/details.css"
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  useBooksApiHandler
    .getBookById(id)
    .then((result) => {
      const book = result.data.volumeInfo;
      console.log("Our user:", req.session, req.session.currentUser);

      const user = req.session.currentUser;

      const {
        title = "Not available",
          authors = ["No authors known"],
          publishedDate = "",
          description,
          pageCount,
          categories = ["No category available"],
      } = book;
      const bookPictureUrl = book.imageLinks.thumbnail
      SavedBook.create({
          title,
          authors,
          publishedDate,
          description,
          bookPictureUrl,
          pageCount,
          categories,
          user: user._id,
        })
        .then((savedBook) => {
          console.log("Inside the first then:", savedBook);

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