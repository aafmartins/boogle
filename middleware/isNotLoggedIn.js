// THIS FUNCTION MAKES SURE THERE ISN'T A USER LOGGED
// IN, IF THERE IS,  IT TAKES YOU TO PROFILE
function isNotLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    res.redirect("/users/profile");
  } else {
    next();
  }
}

module.exports = isNotLoggedIn;