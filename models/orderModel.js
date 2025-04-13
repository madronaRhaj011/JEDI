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

// Function to create a purchase order
exports.createPurchaseOrderFromSuggestion = async (supplier_id, status, order_date, expected_delivery_date, total_amount) => {
    try {
        const sql = `INSERT INTO purchase_orders (supplier_id, status, order_date, expected_delivery_date, total_amount) 
                     VALUES (?, ?, ?, ?, ?)`;
        const [rows] = await db.execute(sql, [supplier_id, status, order_date, expected_delivery_date, total_amount]);
        return rows.insertId; // Return the ID of the created purchase order
    } catch (error) {
        throw new Error('Error Creating Purchase Order: ' + error.message);
    }
};

// Function to add an item to a purchase order
exports.addPurchaseOrderItemFromSuggestion = async (purchase_order_id, product_id, quantity_ordered, unit_price) => {
    try {
        const sql = `INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity_ordered, unit_price) 
                     VALUES (?, ?, ?, ?)`;
        await db.execute(sql, [purchase_order_id, product_id, quantity_ordered, unit_price]);
    } catch (error) {
        throw new Error('Error Adding Purchase Order Item: ' + error.message);
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
exports.addToInventory = async (purchase_order_id, batch_number, inventory_items) => {
    try {
        let insertedIds = [];

        for (const item of inventory_items) {
            const insertQuery = `
                INSERT INTO inventory_list (
                    product_id,
                    supplier_id,
                    quantity_available,
                    batch_number,
                    expiry_date,
                    storage_location
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            const [result] = await db.execute(insertQuery, [
                item.product_id,
                item.supplier_id,
                item.quantity_available,
                batch_number,
                item.expiry_date,
                item.storage_location
            ]);

            insertedIds.push(result.insertId); // Capture the insertId

            const updateStockQuery = `
                UPDATE products 
                SET total_quantity = total_quantity + ? 
                WHERE product_id = ?
            `;

            await db.execute(updateStockQuery, [
                item.quantity_available,
                item.product_id
            ]);
        }

        const updateOrderQuery = `
            UPDATE purchase_orders 
            SET status = 'completed' 
            WHERE id = ?
        `;

        await db.execute(updateOrderQuery, [purchase_order_id]);

        return insertedIds; // Return all inserted inventory_list IDs

    } catch (error) {
        await db.rollback();
        throw new Error('Error adding products to inventory: ' + error.message);
    } 
};


exports.getOrderSuggestions = async () => {
    try {
        const sql = `SELECT 
                    p.product_name,
                    p.product_sku,
                    p.total_quantity,
                    sa.threshold_value
                FROM 
                    products p
                JOIN 
                    stock_alerts sa ON p.product_id = sa.product_id
                WHERE 
                    p.total_quantity < sa.threshold_value;`;
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Inventory List ' + error.message);
    }
}


exports.getLowStockItems = async () => {
    //query na included lahat basta lowstock
    // const query = `
    //    SELECT 
    //     p.product_id,
    //     p.product_name,
    //     p.product_sku,
    //     p.total_quantity,
    //     sa.threshold_value,
    //     s.id AS supplier_id,
    //     s.supplier_name,
    //     supa.pricing_agreement,
    //     supa.lead_time,
    //     CASE
    //         WHEN p.total_quantity < sa.threshold_value 
    //         THEN GREATEST(
    //             sa.threshold_value - p.total_quantity + 10, 
    //             (
    //                 SELECT COALESCE(SUM(si.quantity_sold), 0) 
    //                 FROM sale_item si 
    //                 JOIN sales sl ON si.sale_id = sl.sale_id 
    //                 WHERE si.product_id = p.product_id 
    //                 AND sl.sale_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    //             )
    //         )
    //         ELSE 0
    //     END AS suggested_quantity
    // FROM 
    //     products p
    // JOIN 
    //     stock_alerts sa ON p.product_id = sa.product_id
    // LEFT JOIN 
    //     supplier_agreements supa ON p.product_id = supa.product_id
    // LEFT JOIN 
    //     suppliers s ON supa.supplier_id = s.id
    // WHERE
    //     p.total_quantity < sa.threshold_value
    // ORDER BY 
    //     (p.total_quantity / sa.threshold_value) ASC, 
    //     p.product_name ASC;
    // `;
    // query na excluded yung mga na reorder na
    const query = `SELECT 
        p.product_id,
        p.product_name,
        p.product_sku,
        p.total_quantity,
        sa.threshold_value,
        s.id AS supplier_id,
        s.supplier_name,
        supa.pricing_agreement,
        supa.lead_time,
        CASE
            WHEN p.total_quantity < sa.threshold_value 
            THEN GREATEST(
                sa.threshold_value - p.total_quantity + 10, 
                (
                    SELECT COALESCE(SUM(si.quantity_sold), 0) 
                    FROM sale_item si 
                    JOIN sales sl ON si.sale_id = sl.sale_id 
                    WHERE si.product_id = p.product_id 
                    AND sl.sale_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                )
            )
            ELSE 0
        END AS suggested_quantity
    FROM 
        products p
    JOIN 
        stock_alerts sa ON p.product_id = sa.product_id
    LEFT JOIN 
        supplier_agreements supa ON p.product_id = supa.product_id
    LEFT JOIN 
        suppliers s ON supa.supplier_id = s.id
    WHERE
        p.total_quantity < sa.threshold_value
        AND p.product_id NOT IN (
            SELECT poi.product_id
            FROM purchase_order_items poi
            JOIN purchase_orders po ON poi.purchase_order_id = po.id
            WHERE po.status IN ('pending', 'approved')
        )
    ORDER BY 
        (p.total_quantity / sa.threshold_value) ASC, 
        p.product_name ASC;
    `;
        const [rows] = await db.query(query);
    return rows;
};

exports.getSuppliersForProduct = async (productId) => {
    const [agreements] = await db.query(`
      SELECT sa.supplier_id, sa.pricing_agreement, s.supplier_name as supplier_name
      FROM supplier_agreements sa
      JOIN suppliers s ON sa.supplier_id = s.id
      WHERE sa.product_id = ?
    `, [productId]);
    return agreements;
  };
  
exports.getProductNameById = async (productId) => {
const [product] = await db.query(`SELECT product_name FROM products WHERE product_id = ?`, [productId]);
return product?.[0]?.name || 'Unknown Product';
};

/**
 * Get a purchase order with all related details for PDF generation or email
 * @param {number} orderId - The order ID
 * @returns {Promise<Object>} - The order with supplier and product details
 */
exports.getOrderWithDetails = async (orderId) => {
    try {
        // Query to get order details with supplier information
        const orderQuery = `
            SELECT po.id, po.order_date, po.expected_delivery_date, po.status, 
                   po.total_amount, s.id as supplier_id, s.supplier_name, 
                   s.email as supplier_email, s.contact_person, s.phone_number,
                   s.address
            FROM purchase_orders po
            JOIN suppliers s ON po.supplier_id = s.id
            WHERE po.id = ?
        `;
        
        // Query to get order items with product details
        const itemsQuery = `
            SELECT poi.id as item_id, poi.product_id, p.product_name, p.product_sku,
                   poi.quantity_ordered, poi.unit_price
            FROM purchase_order_items poi
            JOIN products p ON poi.product_id = p.product_id
            WHERE poi.purchase_order_id = ?
        `;
        
        // Execute queries
        const [orderRows] = await db.query(orderQuery, [orderId]);
        const [itemRows] = await db.query(itemsQuery, [orderId]);
        
        if (orderRows.length === 0) {
            return null;
        }
        
        // Combine the data
        const order = orderRows[0];
        order.products = itemRows;
        
        return order;
        
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

exports.cancelOrderById = async (id) => {
    const [result] = await db.execute(
        "UPDATE purchase_orders SET status = 'cancelled' WHERE id = ? AND status = 'pending'",
        [id]
    );
    return result;
};