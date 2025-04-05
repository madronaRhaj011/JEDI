const db = require('../config/db');

exports.addSale = async (customer_name, recorded_by, total_amount, sale_date, proof_of_sale) => {
    try {
        const sql = `INSERT INTO sales (customer_name, recorded_by, total_amount, sale_date, proof_of_sale) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [customer_name, recorded_by, total_amount, sale_date, proof_of_sale]);
        return result;
    } catch (error) {
        throw new Error('Error inserting sale: ' + error.message);
    }
};

exports.addSaleItems = async (sale_id, saleItems) => {
    try {
        for (const item of saleItems) {
            // Fetch product details
            const sqlSelect = `SELECT unit_price, total_quantity FROM products WHERE product_id = ?`;
            const [product] = await db.execute(sqlSelect, [item.product_id]);

            if (product.length === 0) {
                throw new Error(`Product ID ${item.product_id} not found.`);
            }

            const price = product[0].unit_price * item.quantity_sold;
            const currentStock = product[0].total_quantity;

            // Ensure enough stock is available before proceeding
            if (currentStock < item.quantity_sold) {
                throw new Error(`Not enough stock for product ID ${item.product_id}`);
            }

            // Insert into sale_item table
            const sqlInsert = `INSERT INTO sale_item (sale_id, product_id, quantity_sold, price) VALUES (?, ?, ?, ?)`;
            await db.execute(sqlInsert, [sale_id, item.product_id, item.quantity_sold, price]);

            // FIFO Deduction from inventory_list
            let remainingQty = item.quantity_sold;

            while (remainingQty > 0) {
                // Get the oldest available inventory batch for the product
                const sqlFetchBatch = `
                    SELECT id, quantity_available 
                    FROM inventory_list 
                    WHERE product_id = ? AND quantity_available > 0 
                    ORDER BY created_at ASC 
                    LIMIT 1
                `;
                const [batch] = await db.execute(sqlFetchBatch, [item.product_id]);

                if (batch.length === 0) {
                    throw new Error(`No inventory available for product ID ${item.product_id}`);
                }

                const batchId = batch[0].id;
                const batchQty = batch[0].quantity_available;

                if (batchQty >= remainingQty) {
                    // Deduct the required quantity from this batch
                    const sqlUpdateBatch = `UPDATE inventory_list SET quantity_available = quantity_available - ? WHERE id = ?`;
                    await db.execute(sqlUpdateBatch, [remainingQty, batchId]);
                    remainingQty = 0; // All quantity deducted
                } else {
                    // Deduct the entire batch and move to the next
                    const sqlUpdateBatch = `UPDATE inventory_list SET quantity_available = 0 WHERE id = ?`;
                    await db.execute(sqlUpdateBatch, [batchId]);
                    remainingQty -= batchQty; // Reduce remaining quantity
                }
            }

            // Update the product's total_quantity
            const sqlUpdateStock = `UPDATE products SET total_quantity = total_quantity - ? WHERE product_id = ?`;
            await db.execute(sqlUpdateStock, [item.quantity_sold, item.product_id]);
        }
    } catch (error) {
        throw new Error('Error inserting sale items: ' + error.message);
    }
};





exports.getProducts = async () => {
    try {
        const sql = `SELECT product_id, product_name, unit_price FROM products`;
        const [products] = await db.execute(sql);
        return products;
    } catch (error) {
        throw new Error('Error retrieving products: ' + error.message);
    }
};