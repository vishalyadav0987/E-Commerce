const express = require('express');
const router = express.Router();
const { Register } = require('../controllers/userController')


router.route('/register').post(Register)

module.exports = router;