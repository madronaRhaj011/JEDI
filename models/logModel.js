const db = require('../config/db');

exports.getStockAdjustmentLogs = async () => {
    try {
        const sql = 'SELECT * FROM stock_adjustments';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Getting Stock Adjustment Logs ' + error.message);
    }
}

exports.getStockMovementLogs = async () => {
    try {
        const sql = 'SELECT * FROM stock_movements';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Getting Stock Movement Logs ' + error.message);
    }
}

exports.getActivityLogs = async () => {
    try {
        const sql = 'SELECT * FROM activity_logs';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Getting Activity Logs ' + error.message);
    }

}

exports.addActivityLog = async (user_id, action_type, action_details) => {
    try {
        const sql = 'INSERT INTO activity_logs (user_id, action_type, action_details) VALUES (?, ?, ?)';
        const [rows] = await db.execute(sql, [user_id, action_type, action_details]);
        return rows;
    } catch (error) {
        throw new Error('Error Inserting Activity Log: ' + error.message);
    }
};