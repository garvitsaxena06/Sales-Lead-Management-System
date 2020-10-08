var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing');
const { route } = require('./users');

/* GET home page. */
router.get('/', landing.get_landing);

// Submit lead email
router.post('/', landing.submit_lead)

// GET leads list
router.get('/leads', landing.show_leads)

module.exports = router;
