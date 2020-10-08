// GET login page
exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} })
}

// GET signup page
exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} })
}