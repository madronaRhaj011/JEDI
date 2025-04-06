const db = require('../config/db');

exports.getAllInventoryProducts = async () => {
    try {
        const sql = `SELECT 
            products.product_name,
            products.product_sku, 
            products.product_category,
            inventory_list.id, 
            inventory_list.product_id, 
            inventory_list.supplier_id, 
            inventory_list.quantity_available, 
            inventory_list.batch_number, 
            inventory_list.expiry_date, 
            inventory_list.storage_location,
            suppliers.supplier_name
        FROM inventory_list
        JOIN products ON inventory_list.product_id = products.product_id
        JOIN suppliers ON inventory_list.supplier_id = suppliers.id`;
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Inventory List ' + error.message);
    }
};



exports.addInventoryProducts = async (product_id, supplier_id ,quantity_available, batch_number, expiry_date, storage_location) => {
    try {
        const sql = 'INSERT INTO inventory_list (product_id, supplier_id ,quantity_available, batch_number, expiry_date, storage_location) VALUES (?, ?, ?, ?, ?, ?)';
        const [rows] = await db.execute(sql, [product_id, supplier_id ,quantity_available, batch_number, expiry_date, storage_location]);
        return rows;
    } catch (error) {
        throw new Error('Error Inserting Products in Inventory List: ' + error.message);
    }
};

exports.editInventoryProducts = async (id, product_id, supplier_id , expiry_date, storage_location) => {
    try {
        const sql = `
            UPDATE inventory_list 
            SET product_id = ?, supplier_id = ?,   expiry_date = ?, storage_location = ?
            WHERE id = ?
        `;
        const [rows] = await db.execute(sql, [
            product_id,
            supplier_id, 
            expiry_date, 
            storage_location, 
            id
        ]);
        return rows;
    } catch (error) {
        throw new Error('Error Editing Inventory Product: ' + error.message);
    }
};

exports.getBatchNumber = async (product_id) => {
    try {
        const sql = `SELECT MAX(batch_number) as lastBatch FROM inventory_list WHERE product_id = ?`;
        const [rows] = await db.execute(sql, [product_id]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Selecting Batch Number: ' + error.message);
        
    }
}

exports.getQuantityAvailable = async (inventory_id) => {
    try {
        const sql = `SELECT quantity_available FROM inventory_list WHERE id = ?`;
        const [rows] = await db.execute(sql, [inventory_id]);
        
        // Check if any row is returned
        if (rows.length > 0) {
            return rows[0].quantity_available; // Access the quantity_available directly
        } else {
            throw new Error('No data found for the given inventory_id');
        }

    } catch (error) {
        throw new Error('Error Selecting Quantity Available: ' + error.message);
    }
}

exports.getProductId = async (inventory_id) => {
    try {
        const sql = `SELECT product_id FROM inventory_list WHERE id = ?`;
        const [rows] = await db.execute(sql, [inventory_id]);

        // Check if any row is returned
        if (rows.length > 0) {
            return rows[0].product_id; // Access the quantity_available directly
        } else {
            throw new Error('No data found for the given inventory_id');
        }

        
    } catch (error) {
        throw new Error('Error Selecting Product id: ' + error.message);
    }
}



exports.getInventoryById = async (id) => {
    const sql = `SELECT quantity_available FROM inventory_list WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows;
};



exports.updateInventoryStock = async (id, quantity) => {
    try {
        const sql = `UPDATE inventory_list SET quantity_available = ? WHERE id = ?`;
        const [rows] = await db.execute(sql, [quantity, id]);
        return rows;
    } catch (error) {
        throw new Error('Error Subtracting Stock: ' + error.message);
    }
};

exports.addStockAdjustmentLog = async (inventory_id, quantity_adjusted, reason, user_id) => {
    try {
        const sql = `INSERT into stock_adjustments (inventory_id, quantity_adjusted, reason, adjusted_by) VALUES (?, ?, ?, ?)`;
        const rows = await db.execute(sql, [inventory_id, quantity_adjusted, reason, user_id]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Stock Adjustment Log' + error.message);
    }
}


exports.addStockMovementLog = async (inventory_id, movement_type, quantity, reason, user_id) => {
    try {
        const sql = `INSERT INTO stock_movements (inventory_id, movement_type, quantity, reason, user_id) VALUES (?, ?, ?, ?, ?)`;
        const rows = await db.execute(sql, [inventory_id, movement_type, quantity, reason, user_id]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Log' + error.message);
    }
}


