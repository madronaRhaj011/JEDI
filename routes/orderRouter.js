const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')

router.get('/order_suggestions', orderController.getOrderSuggestions)

router.get('/purchase_order', orderController.getOrders);
router.post('/createCustomPO', orderController.createCustomPO);
router.post("/update_order_status", orderController.updateOrderStatus);
router.post("/submit_supplier_review", orderController.submitSupplierReview);
// In your orders routes file
router.post('/cancel_order', orderController.cancelOrder);



// GET route to fetch order items for inventory receipt
router.get('/get_order_items/:id', orderController.getOrderItems);

// POST route to add products to inventory and complete the order
router.post('/add_to_inventory', orderController.addToInventory);

// POST route to create PO
router.post('/create-purchase-order', orderController.createPurchaseOrder);
// router.post('/api/get-suppliers-for-products', orderController.getSuppliersForProducts);

// New routes for PDF and Email
router.get('/download_pdf/:id', orderController.downloadPurchaseOrderPDF);
router.post('/send_email/:id', orderController.sendPurchaseOrderEmail);
module.exports = router;

