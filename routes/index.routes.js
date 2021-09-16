//IMPORT PACKAGES AND USER MODEL
var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const SavedBook = require("../models/SavedBook.model");

//THIS GET METHOD RENDERS HOMEPAGE, PASSING DOWN CORRECT LAYOUT
router.get("/", function (req, res, next) {
  SavedBook.find()
    .sort({
      createdAt: -1
    })
    .limit(8)
    .then((latestBooks) => {
      User.find()
        .then((users) => {
          res.render("index", {
            // title: "Boogle",
            users: users,
            latestBooks,
            style: "Home/index-home.css",
            layout: req.session.currentUser ? "layout" : "anonLayout",
          });
        })
    })
    .catch((err) => console.log(err));
});

module.exports = router;