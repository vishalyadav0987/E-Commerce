const express = require('express');
const router = express.Router();
const { AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
    getSingleProduct } = require('../controllers/productController');
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute');

router.route('/new').post(
    protecteRoute,
    authorizeRole("admin"),
    AddNewProduct
);
router.route('/products').get(getAllProducts);
router.route('/:id').put(
    protecteRoute,
    authorizeRole("admin"),
    updateProduct).delete(
        protecteRoute,
        authorizeRole("admin"),
        removeProduct).get(getSingleProduct);

module.exports = router;