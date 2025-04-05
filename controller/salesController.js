const salesModel = require('../models/salesModel');

exports.showCreateSales = async (req, res) => {
    res.render('sale', {user: req.session.user});
}

exports.addSale = async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // Debugging
        console.log("File Data:", req.file);  // Debugging
        
        const { customer_name, sales_personnel, total_amount, sale_date } = req.body;
        
        // Check if sale_items exist and parse it safely
        const saleItems = req.body.sale_items ? JSON.parse(req.body.sale_items) : [];

        const proof_of_sale = req.file ? req.file.path : null;

        // Insert sale and sale items
        const sale_id = await salesModel.addSale(customer_name, sales_personnel, total_amount, sale_date, proof_of_sale);
        await salesModel.addSaleItems(sale_id.insertId, saleItems);


        req.flash('success', 'Product Added To Sales Successfully!');

        res.json({ success: true, redirectUrl: '/sale/make-a-sale' });
    } catch (error) {
        console.error('Error inserting sale:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getProducts = async (req, res) => {
    try {
        const products = await salesModel.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};
