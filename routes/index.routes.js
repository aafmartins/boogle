var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
/* GET home page. */
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => {
      let id = null;
      if (req.session.currentUser) {
        id = req.session.currentUser._id;
      }
      res.render("index", {
        title: "Boogle",
        users: users,
        currentUser: id,
        style: "Home/index-home.css"
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