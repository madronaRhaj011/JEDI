const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const inventoryController = require('../controller/inventoryController');

router.get('/inventory-list', inventoryController.getAllInventoryProducts);



router.post('/addInventoryProducts',inventoryController.addInventoryProducts);
router.post('/editInventoryProducts', inventoryController.editInventoryProducts);
router.post('/editStock', inventoryController.editStock);






module.exports = router;