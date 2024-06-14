const express = require('express');
const router = express.Router();
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute');
const {
    newOrder,
    getSingleOrderDetail,
} = require('../controllers/orderController');

router.route('/place').post(protecteRoute, newOrder);
router.route('/:id').get(protecteRoute, getSingleOrderDetail);

module.exports = router;