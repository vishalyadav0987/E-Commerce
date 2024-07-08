const express = require('express');
const router = express.Router();
const { AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
    getSingleProduct,
    createProductReview,
    getReviwesAllProducts,
    deleteProductReview,
    getProductForAdmin,
} = require('../controllers/productController');
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute');

router.route('/new').post(
    protecteRoute,
    authorizeRole("admin"),
    AddNewProduct
);
router.route('/products').get(getAllProducts);
router.route('/admin/products').get(getProductForAdmin, authorizeRole("admin"), protecteRoute);
router.route('/:id').put(
    protecteRoute,
    authorizeRole("admin"),
    updateProduct).delete(
        protecteRoute,
        authorizeRole("admin"),
        removeProduct).get(getSingleProduct);

router.route('/review').post(protecteRoute, createProductReview);
router.route('/review/all').get(getReviwesAllProducts);
router.route('/review/delete').delete(protecteRoute, deleteProductReview);;
module.exports = router;