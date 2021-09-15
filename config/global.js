var express = require("express");

var logger = require("morgan");

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const hbs = require("hbs");

// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");

  hbs.registerPartials(path.join(__dirname, "..", "/views/partials"));



  // REGISTERED HANDLEBARS HELPER FUNCTIONS TO HELP WITH CLEARING DATA COMING BACK FROM API
  hbs.registerHelper("splitUrl", function (string) {
    if (string) {
      return string.split(/\s+/).slice(0, 20).join(" ") + "...";
    }
  });
  hbs.registerHelper("splitDescription", function (string) {
    if (string) {
      return string.split(/\s+/).slice(0, 100).join(" ") + "...";
    }
  });
  hbs.registerHelper("cleanDescription", function (string) {
    if (string) {
      return string.replace(/<.{0,2}>/g, "");
    }
  });


  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Handles access to the favicon
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );

  app.use(
    session({
      secret: "Globtrotters-secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost/boogle", // `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
      }),
    })
  );

  //app.use(require("flash")());
};