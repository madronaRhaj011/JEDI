const db = require('../config/db');


exports.registerUser = async (username, password_hash, role, email) => {
    try {
        const sql = 'INSERT INTO users (username, password_hash, role, email) VALUES (?, ?, ?, ?)';
        const [rows] = await db.execute(sql, [username, password_hash, role, email]);
        return rows;
    } catch (error) {
        throw new Error('Error registering user' + error.message);
        
    }
};

exports.findUsername = async (username) => {
    try {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.execute(sql,[username]);
        return rows[0];
    } catch (error) {
        throw new Error('Error finding User'+ error.message);
        
    }
};

exports.findEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];

    } catch (error) {
        throw new Error('Error finding Email' + error.message);
        
    }
}