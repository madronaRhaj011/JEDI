const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controller/productController');

router.get('/product-list', productController.getAllProducts);
router.get('/product_id_name', productController.getProductIdName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img'); // Save images in the public/uploads folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
  });

const upload = multer({ storage });

router.post('/add-product',upload.single('imgPrd'), productController.addProducts);
router.post('/editProducts', productController.editProducts);
router.post('/editStock', productController.editStock);






module.exports = router;