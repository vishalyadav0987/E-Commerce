const express = require('express');
const router = express.Router();
const { Register, Login, Logout, forgetPassword, resetPassword } = require('../controllers/userController')


router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(Logout);

module.exports = router;