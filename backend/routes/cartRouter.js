const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cartController');
const { protecteRoute } = require('../middleware/protectedRoute')


router.post('/add', protecteRoute, addToCart);
router.post('/remove', protecteRoute, removeFromCart);
// router.post('/get',protectedRouteMiddleware,getCartData);

module.exports = router;