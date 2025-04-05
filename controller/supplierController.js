const supplierModel = require('../models/supplierModel');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getAllSupplier();
        res.render('supplier-list', {suppliers, user: req.session.user});
        
    } catch (error) {
        console.error('Error in Displaying Suppliers', error);
        res.status(500).send('Internal Server Error');
        
    }
}

exports.addSupplier = async (req, res) => {
    const {supplier_name, contact_person, email, phone_number, address} = req.body;

    try {
        await supplierModel.addSupplier(supplier_name, contact_person, email, phone_number, address);
        req.flash('success', 'Supplier Added Successfully!');
        req.session.user = req.session.user;

        const suppliers = await supplierModel.getAllSupplier();
        res.render('supplier-list', {suppliers, user: req.session.user});

        
    } catch (error) {
        console.error('Error in Adding Supplier:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.editSupplier = async (req, res) => {
    const {supplier_id, supplierName, contactPerson, supplier_email, supplier_phone_number, supplier_address} = req.body;
    try {
        await supplierModel.editSupplierDetails(supplier_id, supplierName, contactPerson, supplier_email, supplier_phone_number, supplier_address)
        req.flash('success', 'Supplier Details Edited Successfully!');

        const suppliers = await supplierModel.getAllSupplier();
        res.render('supplier-list', {suppliers, user: req.session.user});
    } catch (error) {
        console.error('Error in Editing Supplier Detail:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getSupplierIdName = async (req, res) => {
    try {
        const products = await supplierModel.getSupplierIdName();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.getPricingAgreements = async (req, res) => {
    const supplierId = req.query.supplier_id;

    if (!supplierId) {
        return res.status(400).send("Supplier ID is required");
    }

    try {
        const suppliers = await supplierModel.getPricingAgreements(supplierId);
        const supplier_name = await supplierModel.getSupplier(supplierId);
        
        res.render('pricing_agreements', {suppliers, supplier_name,  user: req.session.user});
        
    } catch (error) {
        console.error('Error in Displaying Suppliers', error);
        res.status(500).send('Internal Server Error');
        
    }
}

exports.getSupplierProducts = async (req, res) => {
    try {
        const { supplierId } = req.params;
        if (!supplierId) return res.status(400).json({ error: "Supplier ID is required" });

        const products = await supplierModel.getSupplierProducts(supplierId);
        res.json(products);
    } catch (error) {
        console.error("Error fetching supplier products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.addPricingAgreement = async (req, res) => {
    const {supplier_id, product_id, pricing_agreement } = req.body;
    try {
        
        await supplierModel.addPricingAgreement(supplier_id, product_id, pricing_agreement);
        req.flash('success', 'Pricing Agreement Added Successfully!');

        const suppliers = await supplierModel.getPricingAgreements(supplier_id);
        const supplier_name = await supplierModel.getSupplier(supplier_id);
        
        res.render('pricing_agreements', {suppliers, supplier_name,  user: req.session.user});

        
    } catch (error) {
        console.error('Error in Adding Supplier:', error);
        res.status(500).send('Internal Server Error');
    }
}



