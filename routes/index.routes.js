//IMPORT PACKAGES AND USER MODEL
var express = require("express");
var router = express.Router();
const User = require("../models/User.model");

//THIS GET METHOD RENDERS HOMEPAGE, PASSING DOWN CORRECT LAYOUT
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => {
      res.render("index", {
        title: "Boogle",
        users: users,
        style: "Home/index-home.css",
        layout: req.session.currentUser ? "layout" : "anonLayout",
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;