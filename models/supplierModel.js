const db = require('../config/db');

exports.getAllSupplier = async () => {
    try {
        const sql = `Select * from suppliers`;
        const [rows] = await db.execute(sql);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Suppliers ' + error.message);
    }
}

exports.addSupplier = async (supplier_name, contact_person, email, phone_number, address, lead_time) => {
    try {
        const sql = `INSERT INTO suppliers (supplier_name, contact_person, email, phone_number, address, lead_time) VALUES (?, ?, ?, ?, ?,?)`;
        const [rows] = await db.execute(sql, [supplier_name, contact_person, email, phone_number, address, lead_time]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Supplier: ' + error.message);
    }
}

exports.editSupplierDetails = async (supplier_id, supplierName, contactPerson , supplier_email, supplier_phone_number, supplier_address, supplier_lead_time) => {
    try {
        const sql = `
            UPDATE suppliers 
            SET supplier_name = ?, contact_person = ?, email = ?, phone_number = ?, address = ?, lead_time = ?
            WHERE id = ?
        `;
        const [rows] = await db.execute(sql, [
            supplierName, 
            contactPerson, 
            supplier_email, 
            supplier_phone_number,
            supplier_address,
            supplier_lead_time,
            supplier_id
        ]);
        return rows;
    } catch (error) {
        throw new Error('Error Editing Supplier Details: ' + error.message);
    }
};

exports.getSupplierIdName = async () => {
    try {
        const sql = "SELECT id, supplier_name FROM suppliers";
        const [products] = await db.execute(sql);
        return products;
    } catch (error) {
        throw error;
    }
};

exports.getOneSupplierIdName = async (supplier_id) => {
    try {
        const sql = "SELECT id, supplier_name FROM suppliers where id = ?";
        const [supplier] = await db.execute(sql, [supplier_id]);
        return supplier;
    } catch (error) {
        throw error;
    }
};

exports.getSupplier = async (supplier_id) => {
    try {
        const sql = "SELECT * FROM suppliers where id = ?";
        const [rows] = await db.execute(sql, [supplier_id],);
        return rows[0];
        
    } catch (error) {
        throw error;
    }
}

exports.getPricingAgreements = async (supplier_id) => {
    try {
        const sql = `Select sa.product_id, sa.pricing_agreement, p.product_name from
         supplier_agreements sa INNER JOIN products p ON sa.product_id = p.product_id where supplier_id = ?`;
        const [rows] = await db.execute(sql, [supplier_id]);
        return rows;
    } catch (error) {
        throw new Error('Error Selecting Suppliers ' + error.message);
    }
    
}

exports.addPricingAgreement = async (supplier_id, product_id, pricing_agreement) => {
    try {
        const sql = `INSERT INTO supplier_agreements (supplier_id, product_id, pricing_agreement) VALUES (?, ?, ?)`;
        const [rows] = await db.execute(sql, [supplier_id, product_id, pricing_agreement]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Supplier Pricing Agreement: ' + error.message);
    }
}

exports.getSupplierProducts = async (supplierId) => {
    const [rows] = await db.execute(
        `SELECT s.supplier_name, sa.product_id, sa.pricing_agreement, p.product_name 
         FROM supplier_agreements sa 
         INNER JOIN products p ON sa.product_id = p.product_id 
         INNER JOIN suppliers s ON sa.supplier_id = s.id 
         WHERE sa.supplier_id = ?`, 
        [supplierId]
    );
    return rows;
};

// Get Supplier Performance
exports.getSupplierPerformance = async () => {
    const query = `
        SELECT 
            s.id AS supplier_id,
            s.supplier_name AS supplier_name,
            COUNT(sp.id) AS total_deliveries,
            ROUND(
                SUM(
                    CASE 
                        WHEN po.expected_delivery_date >= sp.date_delivered 
                        THEN 1 
                        ELSE 0 
                    END
                ) / COUNT(sp.id) * 100, 
                2
            ) AS on_time_rate,
            ROUND(AVG(sp.product_quality_score), 1) AS avg_quality_score
        FROM 
            suppliers s
        LEFT JOIN 
            supplier_performance_review sp ON s.id = sp.supplier_id
        LEFT JOIN 
            purchase_orders po ON sp.purchase_order_id = po.id
        GROUP BY 
            s.id
        ORDER BY 
            s.supplier_name ASC
    `;

    const [rows] = await db.execute(query);
    return rows;
};

exports.getTotalOrdersFulfilled = (supplierId) => {
    return db.execute(`
        SELECT COUNT(*) AS total_orders
        FROM purchase_orders
        WHERE supplier_id = ? AND status = 'completed'
    `, [supplierId]);
};

exports.getLateDeliveries = (supplierId) => {
    return db.execute(`
        SELECT COUNT(*) AS late_deliveries
        FROM supplier_performance_review sp
        JOIN purchase_orders po ON sp.purchase_order_id = po.id
        WHERE po.supplier_id = ? AND sp.date_delivered > po.expected_delivery_date
    `, [supplierId]);
};

exports.getQualityComplaints = (supplierId) => {
    return db.execute(`
        SELECT COUNT(*) AS complaints
        FROM supplier_performance_review sp
        JOIN purchase_orders po ON sp.purchase_order_id = po.id
        WHERE po.supplier_id = ? AND sp.product_quality_score < 4
    `, [supplierId]);
};

exports.getAverageDeliveryTime = (supplierId) => {
    return db.execute(`
        SELECT ROUND(AVG(DATEDIFF(sp.date_delivered, po.order_date)), 0) AS avg_delivery_time
        FROM supplier_performance_review sp
        JOIN purchase_orders po ON sp.purchase_order_id = po.id
        WHERE po.supplier_id = ?
    `, [supplierId]);
};

