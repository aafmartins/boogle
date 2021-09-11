const CharactersService = require("../service/index");
const charactersApiHandler = new CharactersService();
const express = require("express");
const router = express.Router();

router.get("/book-search", (req, res, next) => {
    const {
        title,
        author,
        generic,
        genre
    } = req.query;

    console.log(title,
        author,
        generic,
        genre)

    let query = ``;

    if (!title && !generic && !genre) {
        query = `inauthor:${author}`;
    } else if (!author && !generic && !genre) {
        query = `intitle:${title}`;
    } else if (!author && !title && !genre) {
        query = `inauthor:${generic}`;
    } else if (!author && !title && !generic) {
        query = `inauthor:${genre}`;
    } else {
        query = `intitle:${title}+inauthor:${author}+ingeneric:${generic}+ingenre:${genre}`
    }

    const params = {
        'q': query || 'old',
        'key': process.env.BOOKAPI,
        'maxResults': 40,
        'langRestrict': "en",
        'printType': "books",
    }

    charactersApiHandler.getAllCharacters(params)
        .then((result) => {

            console.log('yayya', params)
            console.log(result.data.items)
            res.render('pages/books/search-results', {
                books: result,
            });
        }).catch((err) => {
            console.log('error')
            console.log(err)
        });
});

module.exports = router;