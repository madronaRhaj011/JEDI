const supplierModel = require('../models/supplierModel');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getAllSupplier();
        const performanceData = await supplierModel.getSupplierPerformance();
        const supplierDd = await supplierModel.getSupplierIdName();

        res.render('supplier-list', {suppliers, performanceData, supplierDd, user: req.session.user});
        
    } catch (error) {
        console.error('Error in Displaying Suppliers', error);
        res.status(500).send('Internal Server Error');
        
    }
}

exports.addSupplier = async (req, res) => {
    const {supplier_name, contact_person, email, phone_number, address, lead_time} = req.body;

    try {
        await supplierModel.addSupplier(supplier_name, contact_person, email, phone_number, address, lead_time);
        req.flash('success', 'Supplier Added Successfully!');
        req.session.user = req.session.user;

        const suppliers = await supplierModel.getAllSupplier();
        const performanceData = await supplierModel.getSupplierPerformance();
        const supplierDd = await supplierModel.getSupplierIdName();

        res.render('supplier-list', {suppliers, performanceData, supplierDd, user: req.session.user});

        
    } catch (error) {
        console.error('Error in Adding Supplier:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.editSupplier = async (req, res) => {
    const {supplier_id, supplierName, contactPerson, supplier_email, supplier_phone_number, supplier_address, supplier_lead_time} = req.body;
    try {
        await supplierModel.editSupplierDetails(supplier_id, supplierName, contactPerson, supplier_email, supplier_phone_number, supplier_address, supplier_lead_time)
        req.flash('success', 'Supplier Details Edited Successfully!');

        const suppliers = await supplierModel.getAllSupplier();
        const performanceData = await supplierModel.getSupplierPerformance();
        const supplierDd = await supplierModel.getSupplierIdName();

        res.render('supplier-list', {suppliers, performanceData, supplierDd, user: req.session.user});
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

exports.getSupplierPerformanceDetails = async (req, res) => {
    const supplierId = req.params.id;

    try {
        const [totalOrdersResult] = await supplierModel.getTotalOrdersFulfilled(supplierId);
        const [lateDeliveriesResult] = await supplierModel.getLateDeliveries(supplierId);
        const [qualityComplaintsResult] = await supplierModel.getQualityComplaints(supplierId);
        const [avgDeliveryTimeResult] = await supplierModel.getAverageDeliveryTime(supplierId);

        const totalOrders = totalOrdersResult[0]?.total_orders || 0;
        const lateDeliveries = lateDeliveriesResult[0]?.late_deliveries || 0;
        const qualityComplaints = qualityComplaintsResult[0]?.complaints || 0;
        const averageDeliveryTime = avgDeliveryTimeResult[0]?.avg_delivery_time || 0;

        res.json({
            success: true,
            data: {
                totalOrders,
                lateDeliveries,
                qualityComplaints,
                averageDeliveryTime
            }
        });
    } catch (err) {
        console.error("Error fetching supplier performance:", err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




