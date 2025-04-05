const orderModel = require('../models/orderModel');

exports.getOrders = async (req, res) => {
    try {
        const { status } = req.query;
        let orders = await orderModel.getPurchaseOrders();

        if (status && status !== "all") {
            orders = orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
        }

        // Check if it's an AJAX request (JSON response needed)
        if (req.xhr) {
            return res.json(orders); // Send JSON if it's an AJAX request
        }

        // If it's a normal request, render the page
        res.render("purchase_order", { orders, user: req.session.user, selectedStatus: status || "all" });
    } catch (error) {
        console.error("Error in Displaying Orders", error);
        res.status(500).send("Internal Server Error");
    }
};





// Function to create a custom purchase order
exports.createCustomPO = async (req, res) => {
    const { supplier_id, products } = req.body;
    const status = "Pending"; // Default status, can be modified
    const order_date = new Date().toISOString();

    try {
        // Calculate the total amount from the products
        let total_amount = 0;
        products.forEach(product => {
            total_amount += product.quantity * product.price; // quantity * unit price
        });

        // Create the purchase order in the database
        const purchase_order_id = await orderModel.createPurchaseOrder(
            supplier_id, status, order_date, total_amount
        );

        console.log(purchase_order_id);
        // Insert each product into the purchase_order_items table
        await orderModel.addPurchaseOrderItems(purchase_order_id, products);

        // Send success response
        res.status(200).json({ message: 'Purchase Order Created Successfully!' });
    } catch (error) {
        console.error('Error in Creating Purchase Order:', error);
        res.status(500).json({ error: 'Failed to create purchase order' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id, status, expected_delivery_date} = req.body; // Get ID and status from request body
        console.log("Updating order status with:", { id, status }); // Debugging line

        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Missing order ID or status" });
        }

        // Add expected_delivery_date if provided
        if (expected_delivery_date && status === 'approved') {
            const success = await orderModel.updateExpectedDeliveryDate(id, status, expected_delivery_date);
            if (success) {
                return res.json({ success: true, message: "Order Expected Delivery Date updated successfully" });
            } else {
                return res.status(400).json({ success: false, message: "Failed to update order Expected Delivery Date" });
            }
        } else {
            const success = await orderModel.updateStatus(id, status);
            if (success) {
                return res.json({ success: true, message: "Order status updated successfully" });
            } else {
                return res.status(400).json({ success: false, message: "Failed to update order status" });
            }
        }

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.submitSupplierReview = async (req, res) => {
    console.log(req.body);
    try {
        const { supplier_id, purchase_order_id, date_delivered, product_quality_score } = req.body;

        // Validate input
        if (!supplier_id || !purchase_order_id || !date_delivered || !product_quality_score) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (product_quality_score < 1 || product_quality_score > 5) {
            return res.status(400).json({ success: false, message: "Product Quality Score must be between 1 and 5." });
        }

        // Insert review into the database
        await orderModel.submitSupplierReview(supplier_id, purchase_order_id, date_delivered, product_quality_score);
        
        res.json({ success: true, message: "Review submitted successfully." });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

// Fetch order items for inventory receipt
exports.getOrderItems = async (req, res) => {
    try {
        const orderId = req.params.id;
        const items = await orderModel.getOrderItems(orderId);

        if (items.length === 0) {
            return res.json({ success: false, message: "No items found for this order" });
        }

        res.json({ success: true, items });
    } catch (error) {
        console.error("Error fetching order items:", error);
        res.status(500).json({ success: false, message: "Failed to fetch order items" });
    }
};

// Add products to inventory and complete the order
exports.addToInventory = async (req, res) => {
    try {
        const { purchase_order_id, inventory_items } = req.body;

        if (!purchase_order_id || !inventory_items || !Array.isArray(inventory_items) || inventory_items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        await orderModel.addToInventory(purchase_order_id, inventory_items);

        res.json({ success: true, message: "Products successfully added to inventory and order marked as completed" });
    } catch (error) {
        console.error("Error adding products to inventory:", error);
        res.status(500).json({ success: false, message: "Failed to add products to inventory" });
    }
};

