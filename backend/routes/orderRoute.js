const express = require('express');
const router = express.Router();
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute');
const {
    newOrder,
    getSingleOrderDetail,
    myOrder,
} = require('../controllers/orderController');

router.route('/orders/place').post(protecteRoute, newOrder);
router.route('/orders/:id').get(protecteRoute, getSingleOrderDetail);
router.route('/me/orders').get(protecteRoute,myOrder);

module.exports = router;