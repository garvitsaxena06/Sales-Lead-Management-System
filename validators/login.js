let models = require('../models');
let validator = require('validator');
let bcrypt = require('bcrypt')

const validateCreateUserFields = function(errors, req) {
	if (!validator.isEmail(req.body.email)) {
		errors["email"] = "Please enter a valid email.";
	}
	if (!validator.isAscii(req.body.password)) {
		errors["password"] = "Invalid characters in password.";		
	}
	if (!validator.isLength(req.body.password, {min: 8})) {
		errors["password"] = "Please enter atleast 8 characters.";
    }
}

exports.validateLoginUser = function(errors, req) {
	return new Promise(function(resolve, reject) {
		validateCreateUserFields(errors, req);
		return models.User.findOne({
			where: {
                email: req.body.email
			}
		}).then(u => {
            console.log()
			if (u === null) {
                errors["email"] = "Account doesn't exist, please create a new account.";
            }
            else {
                if (!bcrypt.compareSync(req.body.password, u.dataValues.password)) {
                    errors["password"] = "Incorrect password, please try again.";
                }
            }
			resolve(errors);
		})
	})
}