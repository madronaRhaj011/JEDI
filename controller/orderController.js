const orderModel = require('../models/orderModel');
const inventoryModel = require('../models/inventoryModel');

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

exports.addToInventory = async (req, res) => {
    try {
        const { purchase_order_id, inventory_items } = req.body;

        if (!purchase_order_id || !Array.isArray(inventory_items) || inventory_items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        

        for (const item of inventory_items) {
            const batchResult = await inventoryModel.getBatchNumber(item.product_id);
            const lastBatch = batchResult[0]?.lastBatch || 0;
            const batch_number = lastBatch + 1;
        
            const user_id = req.session.user.id;
        
            // Corrected here
            const insertedIds = await orderModel.addToInventory(purchase_order_id, batch_number, [item]);
            const p_id = insertedIds[0];
        
            const movement_type = 'in';
            const reason = 'New Supplier Delivery';
        
            await inventoryModel.addStockMovementLog(
                p_id,
                movement_type,
                item.quantity_available,
                reason,
                user_id
            );
        }
        

        res.json({ success: true, message: "Products successfully added to inventory and order marked as completed" });

    } catch (error) {
        console.error("Error adding products to inventory:", error);
        res.status(500).json({ success: false, message: "Failed to add products to inventory" });
    }
};

exports.getOrderSuggestions = async (req, res) => {
    try {
        const lowStockItems = await orderModel.getLowStockItems();

        // Group items by product_id and collect suppliers
        const grouped = {};
        lowStockItems.forEach(item => {
            if (!grouped[item.product_id]) {
                grouped[item.product_id] = {
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_sku: item.product_sku,
                    total_quantity: item.total_quantity,
                    threshold_value: item.threshold_value,
                    suggested_quantity: item.suggested_quantity,
                    suppliers: []
                };
            }

            // If the item has a supplier, add it to the array
            if (item.supplier_id) {
                grouped[item.product_id].suppliers.push({
                    supplier_id: item.supplier_id,
                    supplier_name: item.supplier_name,
                    pricing_agreement: item.pricing_agreement,
                    lead_time: item.lead_time
                });
            }
        });

        const formattedItems = Object.values(grouped);

        res.render('order_suggestion', {
            lowStockItems: formattedItems,
            user: req.session.user
        });

    } catch (error) {
        console.error('Error in Showing Logs:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.createPurchaseOrder = async (req, res) => {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'No valid products provided' });
    }

    const status = "Pending"; // Default status
    const order_date = new Date().toISOString();
    const expected_delivery_date = null; // You might want to calculate this based on lead time

    try {
        // Step 1: Group products by supplier
        const groupedProducts = {};

        products.forEach(product => {
            if (!groupedProducts[product.supplier_id]) {
                groupedProducts[product.supplier_id] = [];
            }
            groupedProducts[product.supplier_id].push({
                product_id: product.product_id,
                quantity: product.quantity,
                price: product.price
            });
        });

        // Step 2: Create purchase orders for each supplier
        const createdOrderIds = [];
        
        for (const [supplierId, items] of Object.entries(groupedProducts)) {
            // Calculate the total amount for this supplier
            let total_amount = 0;
            items.forEach(item => {
                total_amount += item.quantity * item.price;
            });

            // Create the purchase order in the database
            const purchase_order_id = await orderModel.createPurchaseOrderFromSuggestion(
                supplierId, 
                status, 
                order_date, 
                expected_delivery_date, 
                total_amount
            );
            
            createdOrderIds.push(purchase_order_id);

            // Insert each product into the purchase_order_items table
            for (const item of items) {
                await orderModel.addPurchaseOrderItemFromSuggestion(
                    purchase_order_id,
                    item.product_id,
                    item.quantity,
                    item.price
                );
            }
        }

        // Send success response
        res.status(200).json({ 
            message: 'Purchase Orders Created Successfully!',
            orderIds: createdOrderIds
        });
    } catch (error) {
        console.error('Error in Creating Purchase Order:', error);
        res.status(500).json({ error: 'Failed to create purchase order: ' + error.message });
    }
};


exports.getSuppliersForProducts = async (req, res) => {
    const { productIds } = req.body;
  
    try {
      const results = {};
  
      for (const productId of productIds) {
        const suppliers = await orderModel.getSuppliersForProduct(productId);
        const productName = await orderModel.getProductNameById(productId);
  
        results[productId] = {
          name: productName,
          suppliers
        };
      }
  
      res.json({ success: true, products: results });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

