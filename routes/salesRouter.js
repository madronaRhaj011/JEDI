const express =require('express');
const router = express.Router();
const salesController = require('../controller/salesController');
const multer = require('multer');

router.get('/make-a-sale', salesController.showCreateSales);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/proof_of_payment'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('proof_of_sale'), salesController.addSale);
router.get('/product-list', salesController.getProducts);

module.exports = router;