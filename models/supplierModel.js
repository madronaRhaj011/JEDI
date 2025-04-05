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

exports.addSupplier = async (supplier_name, contact_person, email, phone_number, address) => {
    try {
        const sql = `INSERT INTO suppliers (supplier_name, contact_person, email, phone_number, address) VALUES (?, ?, ?, ?, ?)`;
        const [rows] = await db.execute(sql, [supplier_name, contact_person, email, phone_number, address]);
        return rows;
        
    } catch (error) {
        throw new Error('Error Adding Supplier: ' + error.message);
    }
}

exports.editSupplierDetails = async (supplier_id, supplierName, contactPerson , supplier_email, supplier_phone_number, supplier_address) => {
    try {
        const sql = `
            UPDATE suppliers 
            SET supplier_name = ?, contact_person = ?, email = ?, phone_number = ?, address = ?
            WHERE id = ?
        `;
        const [rows] = await db.execute(sql, [
            supplierName, 
            contactPerson, 
            supplier_email, 
            supplier_phone_number,
            supplier_address,
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
