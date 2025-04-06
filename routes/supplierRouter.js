const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplierController');


router.get('/supplier-list', supplierController.getAllSuppliers);
router.get('/pricing-agreement', supplierController.getPricingAgreements);
router.post('/addSupplier', supplierController.addSupplier);
router.post('/editSupplier', supplierController.editSupplier);
router.post('/add-pricing-agreement', supplierController.addPricingAgreement);
router.get('/supplier_id_name', supplierController.getSupplierIdName);
router.get("/pricing_agreements/:supplierId", supplierController.getSupplierProducts);
router.get('/supplier-performance-details/:id', supplierController.getSupplierPerformanceDetails);

module.exports = router;