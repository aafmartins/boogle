//1 import packages and User model
const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

const User = require("../models/User.model");

const isNotLoggedIn = require("../middleware/isNotLoggedIn");

//require cloudinary configuration file
const fileUploader = require("../config/cloudinary");

//2 - Create 5 routes: 2 for login, 2 for signup and 1 for logout
router.get("/signup", isNotLoggedIn, (req, res) => {
  let currentUser = req.session.currentUser;
  res.render("pages/auth/signup", {
    style: "Login-Signup/auth.css",
    layout: currentUser ? "layout" : "anonLayout",
  });
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

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

  User.findOne({
    username,
  })
    .then((user) => {
      if (user) {
        res.render("pages/auth/signup", {
          errorMessage: "User already exists",
          style: "Login-Signup/auth.css",
        });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      User.create({
        username,
        email,
        password: hashPassword,
      })
        .then(() => {
          User.findOne({
            username: username,
          })
            .then((user) => {
              req.session.currentUser = user;
              if (user) {
                res.redirect("/users/profile");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((error) =>
          res.render("pages/auth/signup", {
            errorMessage: error,
            style: "Login-Signup/auth.css",
          })
        );
    })
    .catch((error) => next(error));
});

router.get("/login", isNotLoggedIn, (req, res) => {
  let currentUser = req.session.currentUser;
  res.render("pages/auth/login", {
    style: "Login-Signup/auth.css",
    layout: currentUser ? "layout" : "anonLayout",
  });
});

router.post("/login", (req, res) => {
  //GET VALUES FROM FORM
  const { username, password } = req.body;

  //VALIDATE INPUT
  if (!username || username === "" || !password || password === "") {
    res.render("pages/auth/signup", {
      errorMessage: "Something went wrong",
      style: "Login-Signup/auth.css",
    });
  }

  User.findOne({
    username,
  })
    .then((user) => {
      if (!user) {
        res.render("pages/auth/login", {
          errorMessage: "Input invalid, please try again or sign up 🤓",
          style: "Login-Signup/auth.css",
        });
      } else {
        const encryptedPassword = user.password;
        const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

        if (passwordCorrect) {
          req.session.currentUser = user;
          res.redirect("/users/profile");
        } else {
          res.render("pages/auth/login", {
            errorMessage: "Input invalid, please try again or sign up 🤓",
            style: "Login-Signup/auth.css",
          });
        }
      }
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    console.log(req.session);
    if (err) {
      res.render("error", {
        errorMessage: "Something went wrong! Yikes!",
        style: "Login-Signup/auth.css",
      });
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
