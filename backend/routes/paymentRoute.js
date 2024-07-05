const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router = express.Router();
const { protecteRoute } = require('../middleware/protectedRoute')


router.route('/process').post(protecteRoute, processPayment)
router.route('/stripeapikey').get(protecteRoute, sendStripeApiKey)
module.exports = router;