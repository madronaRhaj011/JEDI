const express = require('express');
const router = express.Router();
const logController = require('../controller/logController')


router.get('/show-all-logs', logController.getAllLogs);

module.exports = router;