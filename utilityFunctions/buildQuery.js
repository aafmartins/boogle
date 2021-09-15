// REQUIRE CHECKAPPEND FUNCTION
const checkAppend = require("./checkAppend")

// THIS FUNCTION HELPS YOU BUILD THE QUERY INSIDE THE BOOK API ROUTE
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