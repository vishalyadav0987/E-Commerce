const express = require('express');
const router = express.Router();
const { AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
    getSingleProduct } = require('../controllers/productController');
const protecteRoute = require('../middleware/protectedRoute');

router.route('/new').post(AddNewProduct);
router.route('/products').get(protecteRoute,getAllProducts);
router.route('/:id').put(updateProduct).delete(removeProduct).get(getSingleProduct);

module.exports = router;