const express = require('express');
const router = express.Router();
const { Register,
    Login,
    Logout,
    forgetPassword,
    resetPassword,
    getUserOwnDetails,
    updatePassword
} = require('../controllers/userController');
const { protecteRoute } = require('../middleware/protectedRoute')


router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(protecteRoute, getUserOwnDetails);
router.route('/password/update').put(protecteRoute, updatePassword);
router.route('/logout').get(Logout);

module.exports = router;