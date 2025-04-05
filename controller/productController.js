const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res ) => {
    try {
        const products = await productModel.getAllProducts();
        res.render('product-list', {products, user: req.session.user});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addProducts = async (req, res) => {
    const { productName, product_sku, category, unit_price } = req.body;
    const total_quantity = 0;
    const imagePath = req.file ? "/img/" + req.file.filename : null; // Store image path

    try {
        // Insert product into database and get the inserted ID
        const product = await productModel.addProducts(productName, product_sku, category, total_quantity, unit_price, imagePath);

        const p_id = product.insertId; // Fix for MySQL2


        // Stock Movement Log
        const movement_type = 'in';
        const quantity = total_quantity;
        const reason = 'Add new Product';
        const user_id = req.session.user.id; // Get user ID from session

        await productModel.addStockMovementLog(p_id, movement_type, quantity, reason, user_id);

        req.flash('success', 'Product Added Successfully!');
        req.session.user = req.session.user;

        const products = await productModel.getAllProducts();
        return res.render('product-list', { products, user: req.session.user });

    } catch (error) {
        console.error('Error in Adding Products:', error);
        res.status(500).send('Internal Server Error');
    }
};




exports.editProducts = async (req, res) => {
    console.log(req.body); // Debugging log to check request data

    const {
        productId,
        product_name,
        productsku, 
        productCategory, 
        productPrice
    } = req.body;

    // Check for missing fields
    if (
        !productId || 
        !product_name ||
        !productsku || 
        !productCategory ||
        !productPrice
    ) {
        console.error('Error: Missing required fields', req.body);
        return res.status(400).send('Missing required fields');
    }

    try {
        await productModel.editProducts(
            productId, 
            product_name,
            productsku, 
            productCategory, 
            productPrice
        );

        req.flash('success', 'Product Updated Successfully!');
        req.session.user = req.session.user;

        const products = await productModel.getAllProducts();
        res.render('product-list', {products, user: req.session.user});
        
    } catch (error) {
        console.log('Error in Updating Products Info', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editStock = async (req, res) => {
    const { product_id, currentStock, quantity, reason, user_id } = req.body;

    // Calculate stock difference (can be positive or negative)
    let quantity_adjusted = quantity - currentStock;

    try {
        // Update stock in products table
        await productModel.updateStock(product_id, quantity);

        // Log the stock adjustment
        await productModel.addStockAdjustmentLog(product_id, quantity_adjusted, reason, user_id);

        req.flash('success', 'Stock Adjustments Log Added Successfully!');

        // Fetch updated products list
        const products = await productModel.getAllProducts();
        return res.render('inventory-list', { products, user: req.session.user });
    } catch (error) {
        console.error('Error in Adding Stock Adjustments Log', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getProductIdName = async (req, res) => {
    try {
        const products = await productModel.getProductIdName();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



        
    


