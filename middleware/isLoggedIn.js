// THIS FUNCTION CHECKS IF THERE IS A USER LOGGED
// IN, IF NOT, IT TAKES YOU BACK TO LOGIN PAGE
function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = isLoggedIn;