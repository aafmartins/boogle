const checkAppend = require("./checkAppend")

function buildQuery(title, author, generic, genre) {

    let query = ``;

    if (title) {
        query += `intitle:${title}`;
    }
    if (author) {
        // checkAppend(query);
        query = checkAppend(query) + `inauthor:${author}`;
    }
    if (generic) {
        checkAppend(query);
        query = checkAppend(query) + `ingeneric:${generic}`;
    }
    if (genre) {
        checkAppend(query);
        query = checkAppend(query) + `ingenre:${genre}`;
    }
    return query
}

module.exports = buildQuery