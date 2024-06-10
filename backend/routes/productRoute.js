const express = require('express');
const router = express.Router();
const { AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct } = require('../controllers/productController');

router.route('/new').post(AddNewProduct);
router.route('/products').get(getAllProducts);
router.route('/:id').put(updateProduct).delete(removeProduct);

module.exports = router;