const express = require('express');
const router = express.Router();
const { AddNewProduct } = require('../controllers/productController');

router.route('/new').post(AddNewProduct);

module.exports = router;