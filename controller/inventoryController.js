const inventoryModel = require('../models/inventoryModel');
const productModel = require('../models/productModel');

exports.getAllInventoryProducts = async (req, res ) => {
    try {
        const products = await inventoryModel.getAllInventoryProducts();
        res.render('inventory-list', {products, user: req.session.user});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addInventoryProducts = async (req, res) => {
    const {product_id, supplier_id ,quantity_available, expiry_date, storage_location} = req.body;

    console.log(req.body);
    try {

        const batchResult = await inventoryModel.getBatchNumber(product_id);
        const lastBatch = batchResult[0]?.lastBatch || 0;
        const batch_number = lastBatch + 1;
        // Insert product into database and get the inserted ID
        const product = await inventoryModel.addInventoryProducts(product_id, supplier_id ,quantity_available, batch_number, expiry_date, storage_location);
        await productModel.addStock(product_id, quantity_available);

        // Ensure the ID is correctly retrieved
        const p_id = product.insertId; // Ensure the correct ID is retrieved
        // Stock Movement Log
        const movement_type = 'in';
        const quantity = quantity_available;
        const reason = 'New Supplier Delivery';
        const user_id = req.session.user.id; // Get user ID from session

        await inventoryModel.addStockMovementLog(p_id, movement_type, quantity, reason, user_id);
        
        req.flash('success', 'Product Added Successfully!');
        req.session.user = req.session.user;

        const products = await inventoryModel.getAllInventoryProducts();
        return res.render('inventory-list', { products, user: req.session.user });

    } catch (error) {
        console.error('Error in Adding Products:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editInventoryProducts = async (req, res) => {
    console.log(req.body); // Debugging log to check request data

    const {inventory_id, productId, supplierId, productExpiryDate, productStorageLocation} = req.body;

    // Check for missing fields
    if (
        !inventory_id || 
        !productId || 
        !supplierId || 
        !productExpiryDate || 
        !productStorageLocation
    ) {
        console.error('Error: Missing required fields', req.body);
        return res.status(400).send('Missing required fields');
    }

    try {

        await inventoryModel.editInventoryProducts(
            inventory_id,
            productId, 
            supplierId, 
            productExpiryDate, 
            productStorageLocation
        );

        req.flash('success', 'Product Updated Successfully!');
        req.session.user = req.session.user;

        const products = await inventoryModel.getAllInventoryProducts();
        return res.render('inventory-list', { products, user: req.session.user });

    } catch (error) {
        console.log('Error in Updating Products Info', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editStock = async (req, res) => {
    const { inv_id, prod_id, current_stock, quantity, reason, user_id } = req.body;

    // Calculate stock difference (can be positive or negative)
    let quantity_adjusted = quantity - current_stock;

    try {
        // Update stock in products table
        await productModel.subtractStock(prod_id, current_stock);
        await inventoryModel.updateInventoryStock(inv_id, quantity);
        await productModel.addStock(prod_id, quantity);

        // Log the stock adjustment
        await inventoryModel.addStockAdjustmentLog(inv_id, quantity_adjusted, reason, user_id);

        req.flash('success', 'Stock Adjusted Successfully!');

        // Fetch updated products list
        const products = await inventoryModel.getAllInventoryProducts();
        return res.render('inventory-list', { products, user: req.session.user });
    } catch (error) {
        console.error('Error in Adding Stock Adjustments Log', error);
        res.status(500).send('Internal Server Error');
    }
};
