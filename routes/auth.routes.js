//1 import packages and User model
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

const User = require("../models/User.model");

// const isNotLoggedIn = require("../../middleware/isNotLoggedIn");

//require cloudinary configuration file
const fileUploader = require("../config/cloudinary");

//2 - Create 5 routes: 2 for login, 2 for signup and 1 for logout
router.get("/signup", (req, res) => {
  res.render("pages/auth/signup");
});

router.post("/signup", fileUploader.single("avatarUrl"), (req, res, next) => {
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
      errorMessage: "Username and password are requiered",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.render("pages/auth/signup", {
          errorMessage: "User already exists",
        });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      User.create({ username, email, password: hashPassword, avatarUrl })
        .then(() => res.render("index"))
        .catch((error) =>
          res.render("pages/auth/signup", { errorMessage: error })
        );
    })
    .catch((error) => next(error));
});

router.get("/login", (req, res) => {
  res.render("pages/auth/login");
});

router.post("/login", (req, res) => {
  //GET VALUES FROM FORM
  const { username, password } = req.body;

  //VALIDATE INPUT
  if (!username || username === "" || !password || password === "") {
    res.render("pages/auth/signup", { errorMessage: "Something went wrong" });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("pages/auth/login", { errorMessage: "Input invalid" });
      } else {
        const encryptedPassword = user.password;
        const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

        if (passwordCorrect) {
          req.session.currentUser = user;
          res.redirect("/users/profile");
        } else {
          res.render("pages/auth/login", { errorMessage: "Input invalid" });
        }
      }
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("error", { message: "Something went wrong! Yikes!" });
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
