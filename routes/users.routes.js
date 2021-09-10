var express = require("express");
var router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/profile", (req, res) => {
  if (req.session.currentUser)
    res.render("pages/user/profile", { user: req.session.currentUser });
  else res.redirect("/");
});

// router.get("/", (req, res) => {
//   res.render("");
// });

module.exports = router;
