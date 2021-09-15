const axios = require("axios");

// THIS IS THE BOOK API THAT WE ARE USING
class GoogleBookApi {
    // CONSTRUCTING THE BASE URL FOR API TO USE, GETTING THE API KEY FROM .ENV FILE
    constructor(baseURL = "https://www.googleapis.com/books/v1") {
        this.baseURL = baseURL
        this.API = process.env.BOOKAPI
        this.api = axios.create({
            baseURL: process.env.API_URL
        })
    }

    //THIS METHOD GETS BOOKS ACCORDING TO PREDEFINED PARAMS
    getAllBooks = (params) => this.api.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: params
    })

    //THIS METHOD GETS BOOKS BY ID
    getBookById = (id) => {
        return this.api.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                return response;
            })
    }
}

module.exports = GoogleBookApi;