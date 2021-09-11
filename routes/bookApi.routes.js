const CharactersService = require("../service/index");
const charactersApiHandler = new CharactersService();
const express = require("express");
const router = express.Router();

router.get("/book-search", (req, res, next) => {
  const { title, author, generic, genre } = req.query;

  console.log(title, author, generic, genre);

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

  charactersApiHandler
    .getAllCharacters(params)
    .then((result) => {
      console.log("yayya", params);
      console.log(result.data.items);
      res.render("pages/books/search-results", {
        books: result,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    });
});

module.exports = router;
