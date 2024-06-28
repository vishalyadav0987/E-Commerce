const express = require('express');
const router = express.Router();
const { Register,
    Login,
    Logout,
    forgetPassword,
    resetPassword,
    getUserOwnDetails,
    updatePassword,
    updateProfile,
    fetchAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controllers/userController');
const { protecteRoute, authorizeRole } = require('../middleware/protectedRoute')


router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(protecteRoute, getUserOwnDetails);
router.route('/password/update').put(protecteRoute, updatePassword);
router.route('/me/profile/update').put(protecteRoute, updateProfile);
router.route('/users').get(protecteRoute, authorizeRole("admin"), fetchAllUser);
router.route('/:id').get(protecteRoute, authorizeRole("admin"), getSingleUser);
router.route('/role/:id').put(protecteRoute, authorizeRole("admin"), updateUserRole);
router.route('/delete/:id').delete(protecteRoute, authorizeRole("admin"), deleteUser);
router.route('/auth/logout').get(Logout);

module.exports = router;