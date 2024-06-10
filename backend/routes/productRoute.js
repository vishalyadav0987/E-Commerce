const express = require('express');
const router = express.Router();
const { AddNewProduct, getAllProducts } = require('../controllers/productController');

router.route('/new').post(AddNewProduct);
router.route('/products').get(getAllProducts);

module.exports = router;