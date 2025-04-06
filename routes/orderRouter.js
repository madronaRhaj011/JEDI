const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')

router.get('/order_suggestions', orderController.getOrderSuggestions)

router.get('/purchase_order', orderController.getOrders);
router.post('/createCustomPO', orderController.createCustomPO);
router.post("/update_order_status", orderController.updateOrderStatus);
router.post("/submit_supplier_review", orderController.submitSupplierReview);



// GET route to fetch order items for inventory receipt
router.get('/get_order_items/:id', orderController.getOrderItems);

// POST route to add products to inventory and complete the order
router.post('/add_to_inventory', orderController.addToInventory);
module.exports = router;

