const axios = require("axios");

class BooksApi {
    constructor(baseURL = "https://ih-crud-api.herokuapp.com") {
        this.baseURL = baseURL
        this.api = axios.create({
            baseURL: process.env.API_URL || this.baseURL
        })
    }

    getAllCharacters = () => this.api.get("/characters")
    getOneCharacter = (charId) => this.api.get(`/characters/${charId}`)
    createCharacter = (bodyWithCharValues) => this.api.post("/characters", bodyWithCharValues)
    deleteCharacter = (charId) => this.api.delete(`/characters/${charId}`)
    updateCharacter = (charId) => this.api.put(`/characters/${charId}`)

}

module.exports = BooksApi;