// utils/pdfGenerator.js
const PDFDocument = require('pdfkit');

// Company information from environment variables or defaults
const companyInfo = {
    name: process.env.COMPANY_NAME || 'Your Company Name',
    address: process.env.COMPANY_ADDRESS || 'Your Company Address, City, Country',
    phone: process.env.COMPANY_PHONE || '123-456-7890',
    email: process.env.COMPANY_EMAIL || 'info@yourcompany.com',
    logo: process.env.COMPANY_LOGO_PATH || './public/img/logo.png' // Path to logo file
};

/**
 * Generate a PDF document for a purchase order
 * @param {Object} order - The order data with all details
 * @returns {Promise<Buffer>} - The generated PDF as a buffer
 */
exports.generatePurchaseOrderPDF = async (order) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a new PDF document
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const chunks = [];
            
            // Collect PDF chunks
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);
            
            // Format dates
            const orderDate = new Date(order.order_date).toLocaleDateString();
            const expectedDeliveryDate = order.expected_delivery_date 
                ? new Date(order.expected_delivery_date).toLocaleDateString()
                : 'Not specified';
                
            // Add company logo if available
            try {
                const fs = require('fs');
                if (fs.existsSync(companyInfo.logo)) {
                    doc.image(companyInfo.logo, 50, 45, { width: 100 });
                    doc.moveDown();
                }
            } catch (err) {
                console.warn('Logo image not found or could not be loaded');
            }
            
            // Document title
            doc.fontSize(20).text('PURCHASE ORDER', { align: 'center' });
            doc.moveDown();
            
            // Order information
            doc.fontSize(12);
            doc.text(`Order #: ${order.id}`, { align: 'right' });
            doc.text(`Date: ${orderDate}`, { align: 'right' });
            doc.text(`Status: ${order.status.toUpperCase()}`, { align: 'right' });
            doc.moveDown();
            
            // From (Company information)
            doc.fontSize(14).text('From:', { underline: true });
            doc.fontSize(12);
            doc.text(companyInfo.name);
            doc.text(companyInfo.address);
            doc.text(`Phone: ${companyInfo.phone}`);
            doc.text(`Email: ${companyInfo.email}`);
            doc.moveDown();
            
            // To (Supplier information)
            doc.fontSize(14).text('To:', { underline: true });
            doc.fontSize(12);
            doc.text(order.supplier_name);
            doc.text(order.address || 'No address provided');
            doc.text(`Contact: ${order.contact_person}`);
            doc.text(`Phone: ${order.phone_number}`);
            doc.text(`Email: ${order.supplier_email}`);
            doc.moveDown();
            
            // Delivery information
            doc.fontSize(14).text('Delivery Information:', { underline: true });
            doc.fontSize(12);
            doc.text(`Expected Delivery: ${expectedDeliveryDate}`);
            doc.moveDown();
            
            // Items table
            doc.fontSize(14).text('Order Items:', { underline: true });
            doc.moveDown();
            
            // Table header
            const tableTop = doc.y;
            const itemsTableTop = tableTop + 20;
            
            doc.fontSize(10);
            doc.font('Helvetica-Bold');
            doc.text('Product', 50, tableTop, { width: 150 });
            doc.text('SKU', 200, tableTop, { width: 80 });
            doc.text('Quantity', 280, tableTop, { width: 70, align: 'center' });
            doc.text('Unit Price', 350, tableTop, { width: 70, align: 'right' });
            doc.text('Total', 420, tableTop, { width: 70, align: 'right' });
            
            // Draw header underline
            doc.moveTo(50, itemsTableTop).lineTo(510, itemsTableTop).stroke();
            doc.font('Helvetica');
            
            // Add items
            let y = itemsTableTop + 10;
            let totalQuantity = 0;
            
            order.products.forEach((product, i) => {
                // Ensure unit_price is a number
                const unitPrice = parseFloat(product.unit_price) || 0;
                const quantity = parseInt(product.quantity_ordered) || 0;
                const productTotal = quantity * unitPrice;
                
                totalQuantity += quantity;
                
                doc.text(product.product_name, 50, y, { width: 150 });
                doc.text(product.product_sku || 'N/A', 200, y, { width: 80 });
                doc.text(String(quantity), 280, y, { width: 70, align: 'center' });
                doc.text(`₱${unitPrice.toFixed(2)}`, 350, y, { width: 70, align: 'right' });
                doc.text(`₱${productTotal.toFixed(2)}`, 420, y, { width: 70, align: 'right' });
                
                y += 20;
                
                // Add a new page if needed
                if (y > 700) {
                    doc.addPage();
                    y = 50;
                }
            });
            
            // Draw total line
            y += 10;
            doc.moveTo(50, y).lineTo(510, y).stroke();
            y += 10;
            
            // Add total
            doc.font('Helvetica-Bold');
            doc.text('Total Quantity:', 280, y, { width: 70, align: 'center' });
            doc.text('Total Amount:', 440, y, { width: 70, align: 'right' });
            doc.text(String(totalQuantity), 280, y + 20, { width: 70, align: 'center' });
            
            // Ensure total_amount is a number
            const totalAmount = parseFloat(order.total_amount) || 0;
            doc.text(`₱${totalAmount.toFixed(2)}`, 420, y + 20, { width: 70, align: 'right' });
            
            // Terms and conditions
            y += 60;
            doc.font('Helvetica-Bold').fontSize(12).text('Terms and Conditions:', 50, y);
            doc.font('Helvetica').fontSize(10);
            y += 20;
            doc.text('1. Please send two copies of your invoice.', 50, y);
            doc.text('2. Enter this order in accordance with the prices, terms, delivery method, and specifications listed above.', 50, y + 15);
            doc.text('3. Please notify us immediately if you are unable to ship as specified.', 50, y + 30);
            
            // Signatures
            y += 70;
            doc.moveTo(50, y).lineTo(250, y).stroke();
            doc.moveTo(310, y).lineTo(510, y).stroke();
            doc.text('Authorized by', 50, y + 10);
            doc.text('Received by', 310, y + 10);
            
            // Finalize the PDF
            doc.end();
            
        } catch (error) {
            reject(error);
        }
    });
};