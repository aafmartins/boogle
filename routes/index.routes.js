var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
/* GET home page. */
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => {
      let currentUser = req.session.currentUser;
      /**
       * if(req.session.currentUser)) res.render("logged-in-index")
       * else res.render("anon-index")
       */
      res.render("index", {
        title: "Boogle",
        users: users,
        style: "Home/index-home.css",
        layout: currentUser ? "layout" : "anonLayout",
      });
    })
    .catch((err) => console.log(err));
});

// .then((users) => {
//   if (req.session.currentUser) {
//     let id = req.session.currentUser._id;
//     res.render("index", {
//       title: "Boogle",
//       users: users,
//       currentUser: id,
//     });
//   } else {
//     res.render("index", {
//       title: "Boogle",
//       users: users,
//     });
//   }
// })
module.exports = router;
