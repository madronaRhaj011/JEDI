const db = require('../config/db');


exports.getUsers = async () => {
    try {
        const sql = 'SELECT * FROM users';
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Users ' + error.message);
    }
};

exports.updateUserRole = async (role, id) => {
    try {
        const sql = 'UPDATE users SET role = ? where id = ?';
        const [rows] = await db.execute(sql, [role, id]);
        return rows;
    } catch (error) {
        throw new Error('Error Editing User Role ' + error.message);
    }
};