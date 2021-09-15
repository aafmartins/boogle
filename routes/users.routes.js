var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const CreatedBook = require("../models/User.model");
const SavedBook = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

const isLoggedIn = require("../middleware/isLoggedIn");

//require cloudinary configuration file
const fileUploader = require("../config/cloudinary");

//DELETE BOOKS
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

//EDIT BOOKS
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      res.render("pages/user/edit-profile", {
        user,
        style: "Profile/edit-profile.css",
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", fileUploader.single("avatarUrl"), (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  const avatarUrl = req.file.path;

  if (
    !username ||
    username === "" ||
    !password ||
    password === "" ||
    !email ||
    email === "" ||
    !email.includes("@")
  ) {
    res.render("pages/auth/signup", {
      errorMessage: "Username and password are required",
      style: "Login-Signup/auth.css",
    });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(id, {
    username,
    email,
    password: hashPassword,
    avatarUrl:
      avatarUrl ||
      "https://www.senertec.de/wp-content/uploads/2020/04/blank-profile-picture-973460_1280.png",
  })
    .then(() => res.redirect("/users/profile"))
    .catch((error) =>
      res.render("pages/auth/signup", {
        errorMessage: error,
        style: "Login-Signup/auth.css",
      })
    );
});

//DISPLAY PROFILE
router.get("/profile", isLoggedIn, (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id).then((user) => {
      let pictureUrl = user.avatarUrl;
      if (!user.avatarUrl) {
        pictureUrl =
          "https://www.senertec.de/wp-content/uploads/2020/04/blank-profile-picture-973460_1280.png";
      }
      res.render("pages/user/profile", {
        user,
        pictureUrl,
        style: "Profile/profile.css",
      });
    });
  } else res.redirect("/");
});

module.exports = router;
