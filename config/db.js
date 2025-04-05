const mysql = require('mysql2');

// Create a connection pool (good for handling multiple simultaneous connections)
const pool = mysql.createPool({
  host: 'localhost',      // Your database host (e.g., 'localhost')
  user: 'root',           // Your database username
  password: '', // Your database password
  database: 'jedidb', // Your database name
  waitForConnections: true, // Wait for connections if the pool is busy
  connectionLimit: 10,     // Max number of simultaneous connections
  queueLimit: 0           // No queue limit
});

// Promisify for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;