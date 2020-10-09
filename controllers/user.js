const passport = require('passport')
let models = require('../models')
let bcrypt = require('bcrypt')
const myPassport = require('../passport_setup')(passport)
let flash = require('connect-flash')
const { validateUser } = require('../validators/signup')
const { validateLoginUser } = require('../validators/login')
const { isEmpty } = require('lodash')

var isAdmin = false

// GET login page
exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} })
}

const rerender_login = function(errors, req, res, next) {
    res.render('user/login', { formData: req.body, errors: errors })
}

// GET signup page
exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} })
}

const rerender_signup = function(errors, req, res, next) {
	res.render('user/signup', { formData: req.body, errors: errors});
}

// POST login
exports.login = function(req, res, next) {
    let errors = {};
	return validateLoginUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_login(errors, req, res, next);
        }
        else {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            })(req, res, next)
        }
    }).catch(err => {
        console.log(err)
    })
}

// POST signup
const generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
        } 
        else {
            return models.User.findOne({
                where: {
                    is_admin: true
                }
            }).then(user => {
                let newUser
                if (user !== null) {
                    newUser = models.User.build({
                        email: req.body.email,
                        password: generateHash(req.body.password)
                    })
                }
                else {
                    newUser = models.User.build({
                        email: req.body.email,
                        password: generateHash(req.body.password),
                        is_admin: true
                    })
                }
                return newUser.save().then(result => {
                    passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/signup',
                        failureFlash: true
                    })(req, res, next)
                })
            })
        }
	})
}

exports.logout = function(req, res, next) {
    req.logout()
    req.session.destroy()
    res.redirect('/')
}