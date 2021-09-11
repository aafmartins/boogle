require("dotenv").config();

var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var authRouter = require("./routes/auth.routes");
var bookApiRouter = require("./routes/bookApi.routes");
var bookRouter = require("./routes/book.routes");

var app = express();

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);
app.use("/", bookApiRouter);
app.use("/books", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
