const GoogleBookApi = require("../service/index");
const useBooksApiHandler = new GoogleBookApi();
const SavedBook = require("../models/SavedBook.model");
const User = require("../models/User.model");
const router = require("express").Router();

router.get("/book-search", (req, res, next) => {
  const { title, author, generic, genre } = req.query;

  //console.log(title, author, generic, genre);

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
    maxResults: 40,
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
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    });
});

//BOOK DETAILS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  useBooksApiHandler
    .getBookById(id)
    .then((book) => {
      res.render("pages/search/search-book-detail", {
        book: book.data.volumeInfo,
        bookId: book.data.id,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  // console.log("Our id:", id);

  // console.log(id)
  useBooksApiHandler
    .getBookById(id)
    .then((result) => {
      let book = result.data.volumeInfo;

      const user = req.session.currentUser;
      let newBook = {
        title: book.title || "not available",
        authors: book.authors[0] || "not available",
        publishedDate: book.publishedDate || "not available",
        description: book.description || "not available",
        pageCount: book.pageCount || "not available",
        categories: book.categories[0] || "not available",
        maturityRating: book.maturityRating || "not available",
        user,
      };

      SavedBook.create(newBook)
        .then((savedBook) => {
          console.log("Inside the first then:", savedBook);
          User.findByIdAndUpdate(user._id, {
            $push: { savedBooks: savedBook },
          })
            .then((updatedUser) => res.redirect("/bookshelf/my-saved-books"))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log("was not able to add a new book to collection");
        });
    })
    .catch((err) => {
      console.log("was not able to get info of book");
    });
});

module.exports = router;
