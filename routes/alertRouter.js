const express = require('express');
const router = express.Router();
const alertController = require('../controller/alertController');

router.get('/stock-alert', alertController.showStockAlertPage);
router.get('/product_id_name_alert', alertController.getProductAlertDropdown);
router.post('/add-alert-threshold', alertController.addAlertThreshold); 
router.post('/edit-alert-threshold', alertController.editAlertThreshold); 
router.get('/product_threshold/:id', alertController.getSuggestedThreshold);




module.exports = router;