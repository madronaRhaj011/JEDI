const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/login', controller.login);
router.get('/homepage',isAuthenticated.isAuthenticated, controller.homepage);
router.get('/register', controller.register);
router.get('/', controller.landing);

module.exports = router;