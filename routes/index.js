var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user')

let { isLoggedIn, hasAuth } = require('../middleware/hasAuth')

// GET login page
router.get('/login', user.show_login)

// GET signup page
router.get('/signup', user.show_signup)

// POST login page
router.post('/login', user.login)

// POST signup page
router.post('/signup', user.signup)

// GET logout
router.get('/logout', user.logout)

// POST logout
router.post('/logout', user.logout)

// GET home page
router.get('/', landing.get_landing);

// Submit lead email
router.post('/', landing.submit_lead)

// GET leads list
router.get('/leads', hasAuth, landing.show_leads)

// GET particular lead details
router.get('/lead/:lead_id', hasAuth, landing.show_lead)

// GET edit a lead's details page
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead)

// Submit edit lead's details
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead)

// Deleting a lead's details
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead)

// Deleting a lead's details --AJAX method
router.post('/lead/:lead_id/delete-json', hasAuth, landing.delete_lead_json)

module.exports = router;
