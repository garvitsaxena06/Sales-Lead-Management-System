let LocalStrategy = require('passport-local').Strategy
let models = require('./models')
let bcrypt = require('bcrypt')

// Checking valid password (hash password is stored in the database)
const validPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)   /* password will be converted into hash, also comparison is done of the hash password */
}

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        models.User.findOne({
            where: {
                'id': id
            }
        }).then(user => {
            if (user === null) {
                done(new Error('Wrong user id.'))
            }
            done(null, user)
        })
    })

    // Localstratey for passport JS to authenticate the user
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true         /* to access the req object */
    },

    // authenticate funtion
    function(req, email, password, done) {
        return models.User.findOne({
            where: {
                'email': email
            }
        }).then(user => {
            if (user == null) {                                 /* Incorrect username */
                req.flash('message', 'Incorrect credentials.')
                return done(null, false)
            }
            else if (user.password == null || user.password == undefined) {
                req.flash('messsage', 'You must reset your password.')
                return done(null, false)
            }
            else if (!validPassword(user, password)) {
                req.flash('message', 'Incorrect credentials.')
                return done(null, false)
            }
            return done(null, user)
        }).catch(err => {
            done(err, false)
        })
    }))
}