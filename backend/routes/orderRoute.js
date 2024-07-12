const express = require('express');
const router = express.Router();
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute');
const {
    newOrder,
    getSingleOrderDetail,
    myOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');

router.route('/orders/place').post(protecteRoute, newOrder);
router.route('/orders/:id').get(protecteRoute, getSingleOrderDetail);
router.route('/me/orders').get(protecteRoute, myOrder);
router.route('/orders').get(protecteRoute, authorizeRole("admin"), getAllOrders);
router.route('/orders/update/status/:id').put(protecteRoute, authorizeRole("admin"), updateOrderStatus);
router.route('/orders/delete/:id').delete(protecteRoute, authorizeRole("admin"), deleteOrder);

module.exports = router;