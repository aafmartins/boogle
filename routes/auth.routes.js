//import packages and User model
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;
const User = require("../models/User.model");
// IMPORTING FUNCTION
const isNotLoggedIn = require("../middleware/isNotLoggedIn");

//Create 5 routes: 2 for signup, 2 for login and 1 for logout

router
  .route("/signup")
  // THIS GET METHOD RENDERS THE SIGNUP PAGE IF USER IS NOT LOGGED IN
  .get(isNotLoggedIn, (req, res) => {
    res.render("pages/auth/signup", {
      style: "Login-Signup/auth.css",
      layout: req.session.currentUser ? "layout" : "anonLayout",
    });
  })
  // THIS POST METHOD TAKES THE INFO FROM THE FORM,
  // AND CREATES A NEW USER
  // IT ALSO CREATES A HASHED PASSWORD AND CHECKS IF THE INPUTS ARE CORRECT
  .post((req, res, next) => {
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

router
  .route("/login")
  // THIS GET METHOD RENDERS THE LOGIN PAGE IF USER IS NOT LOGGED IN
  .get(isNotLoggedIn, (req, res) => {
    let currentUser = req.session.currentUser;
    res.render("pages/auth/login", {
      style: "Login-Signup/auth.css",
      layout: currentUser ? "layout" : "anonLayout",
    });
  })
  // THIS POST METHOD RECEIVES INFORMATION FROM THE LOGIN FORM
  .post((req, res) => {
    const { username, password } = req.body;

    //VALIDATE INPUT
    if (!username || username === "" || !password || password === "") {
      res.render("pages/auth/signup", {
        errorMessage: "Something went wrong!",
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
          const passwordCorrect = bcrypt.compareSync(
            password,
            encryptedPassword
          );

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

//THIS GET METHOD DELETE THE COOKIES AND DELETE THE SESSION
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("pages/auth/login", {
        errorMessage: "Something went wrong! Yikes!",
        style: "Login-Signup/auth.css",
      });
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
