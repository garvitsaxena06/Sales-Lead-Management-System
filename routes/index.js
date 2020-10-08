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

// GET particular lead details
router.get('/lead/:lead_id', landing.show_lead)

// GET edit a lead's details page
router.get('/lead/:lead_id/edit', landing.show_edit_lead)

// Submit edit lead's details
router.post('/lead/:lead_id/edit', landing.edit_lead)

// Deleting a lead's details
router.post('/lead/:lead_id/delete', landing.delete_lead)

module.exports = router;
