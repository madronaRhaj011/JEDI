const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');


router.post('/register', authController.user_register);
router.post('/login', authController.user_login);
router.post('/logout', authController.user_logout);

module.exports = router;

