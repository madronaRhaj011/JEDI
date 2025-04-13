// utils/emailService.js
const nodemailer = require('nodemailer');

// Company information from environment variables
const companyName = process.env.COMPANY_NAME || 'Your Company Name';
const companyEmail = process.env.COMPANY_EMAIL || 'info@yourcompany.com';

/**
 * Configure email transporter
 * Using environment variables for sensitive information
 */
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // false for STARTTLS (port 587)
    auth: {
        user: process.env.EMAIL_USER || 'your-email@example.com',
        pass: process.env.EMAIL_PASSWORD || 'your-password'
    },
    tls: {
        rejectUnauthorized: true // <- add this
    }
});


/**
 * Send purchase order email to supplier
 * @param {Object} params - Email parameters
 * @param {number} params.orderId - Purchase order ID
 * @param {string} params.supplierName - Supplier name
 * @param {string} params.supplierEmail - Supplier email address
 * @param {Date} params.orderDate - Order date
 * @param {number} params.totalAmount - Total order amount
 * @param {Buffer} params.pdfBuffer - PDF attachment buffer
 * @returns {Promise<Object>} - Nodemailer response
 */
exports.sendPurchaseOrderEmail = async (params) => {
    try {
        const {
            orderId,
            supplierName,
            supplierEmail,
            orderDate,
            totalAmount,
            pdfBuffer
        } = params;
        
        // Format date for email
        const formattedDate = new Date(orderDate).toLocaleDateString();
        
        // Ensure totalAmount is a number
        const parsedTotalAmount = parseFloat(totalAmount) || 0;
        
        // Configure email options
        const mailOptions = {
            from: `"${companyName}" <${process.env.EMAIL_USER || companyEmail}>`,
            to: supplierEmail,
            subject: `Purchase Order #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4A5568;">Purchase Order #${orderId}</h2>
                    
                    <p>Dear ${supplierName},</p>
                    
                    <p>Please find attached our purchase order #${orderId} dated ${formattedDate} 
                    with a total amount of ₱${parsedTotalAmount.toFixed(2)}.</p>
                    
                    <p>Kindly acknowledge receipt of this order and confirm the delivery date at your earliest convenience.</p>
                    
                    <p>If you have any questions or need further clarification, please do not hesitate to contact us.</p>
                    
                    <p style="margin-top: 20px;">Best regards,</p>
                    <p>${companyName} Procurement Team</p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #718096;">
                        <p>This is an automated email. Please do not reply directly to this message.</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `purchase_order_${orderId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        return info;
        
    } catch (error) {
        console.error('Email service error:', error);
        throw error;
    }
};

/**
 * Verify email configuration
 * @returns {Promise<boolean>} - True if verification succeeds
 */
exports.verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('Email service is configured correctly');
        return true;
    } catch (error) {
        console.error('Email configuration error:', error);
        return false;
    }
};