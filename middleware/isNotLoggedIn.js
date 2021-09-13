function isNotLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    res.redirect("/users/profile");
  } else {
    next();
  }
}

module.exports = isNotLoggedIn;
