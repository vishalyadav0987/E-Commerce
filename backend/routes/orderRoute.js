const express = require('express');
const router = express.Router();
const {protecteRoute,authorizeRole} = require('../middleware/protectedRoute');
const { newOrder } = require('../controllers/orderController');

router.route('/place').post(protecteRoute,newOrder);

module.exports = router;