const db = require('../config/db');

exports.getProductAlertDropdown = async () => {
    try {
        const sql = `
            SELECT product_id, product_name
            FROM products
            WHERE product_id NOT IN (SELECT product_id FROM stock_alerts)
        `;
        const [products] = await db.execute(sql);
        return products;
    } catch (error) {
        throw error;
    }
};

exports.getSuggestedThresholdByProductId = async (productId) => {
    const sql = `
        SELECT 
            ROUND(SUM(si.quantity_sold) / COUNT(DISTINCT s.sale_date) * sa.lead_time) AS suggested_threshold
        FROM sale_item si
        JOIN sales s ON s.sale_id = si.sale_id
        JOIN supplier_agreements sa ON sa.product_id = si.product_id
        WHERE si.product_id = ?
    `;
    const [result] = await db.execute(sql, [productId]);
    return result[0]?.suggested_threshold || 10; // Default fallback if null
};


exports.addAlertThreshold = async (product_id, threshold_value, days_before_alert_period) => {
    try {
        const sql = 'INSERT INTO stock_alerts (product_id, threshold_value, days_before_alert_period) VALUES (?, ?, ?)';
        const [rows] = await db.execute(sql, [product_id, threshold_value, days_before_alert_period]);
        return rows;
    } catch (error) {
        throw new Error('Error Inserting Thresholds in Stock Alerts: ' + error.message);
    }
};

exports.editAlertThreshold = async (threshold, day_before_expiry, alert_id) => {
    try {
        const sql = `
            UPDATE stock_alerts 
            SET threshold_value = ?, days_before_alert_period = ? 
            WHERE id = ?
        `;
        const [rows] = await db.execute(sql, [threshold, day_before_expiry, alert_id]);
        return rows;
    } catch (error) {
        throw new Error('Error Updating Thresholds in Stock Alerts: ' + error.message);
    }
}


exports.getAlertThresholds = async () => {
    try {
        const sql = 'SELECT * FROM stock_alerts';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Inventory List ' + error.message);
    }
};

exports.getLowStockAlerts = async () => {
    try {
        const sql = `SELECT 
                    p.product_name  ,
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
};

exports.getExpiryAlerts = async () => {
    try {
        const sql = `SELECT 
            p.product_name AS 'Product Name',
            p.product_sku AS 'SKU',
            il.expiry_date AS 'Expiry Date',
            DATEDIFF(il.expiry_date, CURDATE()) AS 'Days Left',
            sa.days_before_alert_period AS 'Alert Period',
            'Discount' AS 'Action'
        FROM 
            products p
        JOIN 
            inventory_list il ON p.product_id = il.product_id
        JOIN 
            stock_alerts sa ON p.product_id = sa.product_id
        WHERE 
            DATEDIFF(il.expiry_date, CURDATE()) <= sa.days_before_alert_period
            AND DATEDIFF(il.expiry_date, CURDATE()) >= 0
        ORDER BY 
            il.expiry_date ASC;
        `;
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Inventory List ' + error.message);
    }
};

