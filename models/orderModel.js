const db = require('../config/db');

const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0]; // Outputs YYYY-MM-DD
};

exports.getPurchaseOrders = async (status) => {
    try {
        let sql = `
            SELECT po.id, po.supplier_id, po.status, po.order_date, po.total_amount,
                   poi.product_id, poi.quantity_ordered, poi.unit_price, 
                   p.product_name, s.supplier_name
            FROM purchase_orders po
            INNER JOIN purchase_order_items poi ON po.id = poi.purchase_order_id
            INNER JOIN products p ON poi.product_id = p.product_id
            INNER JOIN suppliers s ON po.supplier_id = s.id
        `;

        const params = [];
        if (status && status !== 'all') {
            sql += ` WHERE po.status = ?`;
            params.push(status);
        }

        sql += ` ORDER BY po.id, poi.product_id;`;

        const [rows] = await db.execute(sql, params);

        // Group orders properly
        const orders = {};
        rows.forEach(row => {
            if (!orders[row.id]) {
                orders[row.id] = {
                    id: row.id,
                    supplier_id: row.supplier_id,
                    supplier_name: row.supplier_name,
                    status: row.status,
                    order_date: formatDate(row.order_date), // Convert to YYYY-MM-DD
                    total_amount: Number(row.total_amount) || 0,
                    products: []
                };
            }

            orders[row.id].products.push({
                product_id: row.product_id,
                product_name: row.product_name,
                quantity_ordered: row.quantity_ordered,
                unit_price: row.unit_price
            });
        });

        return Object.values(orders);
    } catch (error) {
        throw new Error('Error Selecting Purchase Orders: ' + error.message);
    }
};






// Function to create a purchase order
exports.createPurchaseOrder = async (supplier_id, status, order_date, total_amount) => {
    try {
        const sql = `INSERT INTO purchase_orders (supplier_id, status, order_date, total_amount) 
                     VALUES (?, ?, ?, ?)`;
        const [rows] = await db.execute(sql, [supplier_id, status, order_date, total_amount]);
        return rows.insertId; // Return the ID of the created purchase order
    } catch (error) {
        throw new Error('Error Creating Purchase Order: ' + error.message);
    }
};

// Function to add products to the purchase_order_items table
exports.addPurchaseOrderItems = async (purchase_order_id, products) => {
    try {
        const productPromises = products.map(product => {
            const sql = `INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity_ordered, unit_price)
                         VALUES (?, ?, ?, ?)`;
            return db.execute(sql, [purchase_order_id, product.product_id, product.quantity, product.price]);
        });

        // Wait for all product insertions to complete
        await Promise.all(productPromises);
    } catch (error) {
        throw new Error('Error Adding Purchase Order Items: ' + error.message);
    }
};


// Function to update purchase order status
exports.updateStatus = async (orderId, status) => {
    try {
        const sql = `UPDATE purchase_orders SET status = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [status, orderId]);
        return result.affectedRows > 0; // Returns true if the update was successful
    } catch (error) {
        throw new Error("Error Updating Order Status: " + error.message);
    }
};

exports.updateExpectedDeliveryDate = async (orderId, status, expected_delivery_date) => {
    try {
        const sql = `UPDATE purchase_orders SET expected_delivery_date = ?, status = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [expected_delivery_date, status, orderId]);
        return result.affectedRows > 0; // Returns true if the update was successful
    } catch (error) {
        throw new Error("Error Updating Order Expected Delivery Date: " + error.message);
    }
};

exports.submitSupplierReview = async (supplier_id, purchase_order_id, date_delivered, product_quality_score) => {
    try {
        const sql = `
            INSERT INTO supplier_performance_review 
            (supplier_id, purchase_order_id, date_delivered, product_quality_score) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [supplier_id, purchase_order_id, date_delivered, product_quality_score]);
        return result;
    } catch (error) {
        throw error;
    }
}


// Fetch order items for inventory receipt
exports.getOrderItems = async (purchase_order_id) => {
    try {
        let sql = `
            SELECT 
                poi.purchase_order_id,
                poi.product_id,
                p.product_name,
                poi.quantity_ordered,
                poi.unit_price
            FROM 
                purchase_order_items poi
            INNER JOIN 
                products p ON poi.product_id = p.product_id
            WHERE 
                poi.purchase_order_id = ?
        `;

        const [rows] = await db.execute(sql, [purchase_order_id]);

        if (!rows.length) {
            return [];
        }

        return rows;
    } catch (error) {
        throw new Error('Error fetching order items: ' + error.message);
    }
};

// Add products to inventory and complete the order
exports.addToInventory = async (purchase_order_id, inventory_items) => {
    try {

        for (const item of inventory_items) {
            let insertQuery = `
                INSERT INTO inventory_list (
                    product_id,
                    supplier_id,
                    quantity_available,
                    batch_number,
                    expiry_date,
                    storage_location
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            await db.execute(insertQuery, [
                item.product_id,
                item.supplier_id,
                item.quantity_available,
                item.batch_number,
                item.expiry_date,
                item.storage_location
            ]);

            let updateStockQuery = `
                UPDATE products 
                SET stock_quantity = stock_quantity + ? 
                WHERE id = ?
            `;

            await db.execute(updateStockQuery, [
                item.quantity_available,
                item.product_id
            ]);
        }

        let updateOrderQuery = `
            UPDATE purchase_orders 
            SET status = 'completed' 
            WHERE id = ?
        `;

        await db.execute(updateOrderQuery, [purchase_order_id]);

        return { success: true, message: "Products successfully added to inventory and order marked as completed" };
    } catch (error) {
        await db.rollback();
        throw new Error('Error adding products to inventory: ' + error.message);
    } 
};
