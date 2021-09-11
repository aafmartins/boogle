// const axios = require("axios");

// class BooksApi {
//     constructor(baseURL = "https://ih-crud-api.herokuapp.com") {
//         this.baseURL = baseURL
//         this.api = axios.create({
//             baseURL: process.env.API_URL || this.baseURL
//         })
//     }

//     getAllCharacters = () => this.api.get("/characters")
//     getOneCharacter = (charId) => this.api.get(`/characters/${charId}`)
//     createCharacter = (bodyWithCharValues) => this.api.post("/characters", bodyWithCharValues)
//     deleteCharacter = (charId) => this.api.delete(`/characters/${charId}`)
//     updateCharacter = (charId) => this.api.put(`/characters/${charId}`)

// }

// module.exports = BooksApi;


const axios = require("axios");


class CharactersApi {
    constructor(baseURL = "https://www.googleapis.com/books/v1") {
        this.baseURL = baseURL
        this.API = process.env.BOOKAPI
        this.api = axios.create({
            baseURL: process.env.API_URL
        })
    }


    getAllCharacters = (params) => this.api.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: params
    })


}

module.exports = CharactersApi;