const db = require('../config/db');

exports.getAllProducts = async () => {
    try {
        const sql = 'SELECT * FROM products';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Inventory List ' + error.message);
    }
};


exports.addProducts = async (product_name, product_sku, product_category, total_quantity, unit_price, image_path) => {
    try {
        const sql = 'INSERT INTO products (product_name, product_sku, product_category, total_quantity, unit_price, image_path) VALUES (?, ?, ?, ?, ?, ?)';
        const [rows] = await db.execute(sql, [product_name, product_sku, product_category, total_quantity, unit_price, image_path]);
        return rows;
    } catch (error) {
        throw new Error('Error Inserting Products in Inventory List: ' + error.message);
    }
};

exports.editProducts = async (id, name, sku, category, price) => {
    try {
        const sql = `
            UPDATE products 
            SET product_name = ?, product_sku = ?, product_category = ?, unit_price = ? 
            WHERE product_id = ?
        `;
        const [rows] = await db.execute(sql, [
            sku, 
            name,
            category, 
            price,
            id
        ]);
        return rows;
    } catch (error) {
        throw new Error('Error Editing Products: ' + error.message);
    }
};

exports.addStock = async (product_id, quantityToAdd) => {
    try {
        const sql = `UPDATE products SET total_quantity = total_quantity + ? WHERE product_id = ?`;
        const [rows] = await db.execute(sql, [quantityToAdd, product_id]);
        return rows;
    } catch (error) {
        throw new Error('Error Adding Stock: ' + error.message);
    }
};

exports.subtractStock = async (id, quantity) => {
    try {
        const sql = `UPDATE products SET total_quantity = total_quantity - ? WHERE product_id = ?`;
        const [rows] = await db.execute(sql, [quantity, id]);
        return rows;
    } catch (error) {
        throw new Error('Error Subtracting Stock: ' + error.message);
    }
};


exports.updateStock = async (id, quantity) => {
    try {
        const sql = `UPDATE inventory_list SET quantity_available = ? WHERE id = ?`;
        const [rows] = await db.execute(sql, [quantity, id]);
        return rows;
    } catch (error) {
        throw new Error('Error Subtracting Stock: ' + error.message);
    }
};

exports.addStockAdjustmentLog = async (product_id, quantity_adjusted, reason, user_id) => {
    try {
        const sql = `INSERT into stock_adjustments (product_id, quantity_adjusted, reason, adjusted_by) VALUES (?, ?, ?, ?)`;
        const rows = await db.execute(sql, [product_id, quantity_adjusted, reason, user_id]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Stock Adjustment Log' + error.message);
    }
}


exports.addStockMovementLog = async (product_id, movement_type, quantity, reason, user_id) => {
    try {
        const sql = `INSERT INTO stock_movements (product_id, movement_type, quantity, reason, user_id) VALUES (?, ?, ?, ?, ?)`;
        const rows = await db.execute(sql, [product_id, movement_type, quantity, reason, user_id]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Log' + error.message);
    }
}



exports.getProductIdName = async () => {
    try {
        const sql = "SELECT product_id, product_name FROM products";
        const [products] = await db.execute(sql);
        return products;
    } catch (error) {
        throw error;
    }
};


