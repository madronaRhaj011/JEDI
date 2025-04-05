const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/user-management', userController.getUsers);
router.post('/updateUserRole', userController.updateUserRole);

module.exports = router;