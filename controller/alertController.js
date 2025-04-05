const alertModel = require('../models/alertModel');

exports.showStockAlertPage = async (req, res) => {
    try {
        const alerts = await alertModel.getAlertThresholds();
        const lowalerts = await alertModel.getLowStockAlerts();
        const expiryalerts = await alertModel.getExpiryAlerts();
        res.render('stock_alert', {alerts, expiryalerts, lowalerts, user: req.session.user});
        
    } catch (error) {
        console.error('Error fetching Alerts:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getProductAlertDropdown = async (req, res) => {
    try {
        const products = await alertModel.getProductAlertDropdown();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addAlertThreshold = async (req, res) => {
    const {product_id, threshold, day_before_expiry} = req.body;
    
    try {
        await alertModel.addAlertThreshold(product_id, threshold, day_before_expiry);
        req.flash('success', 'Alert Threshold Added Successfully!');
        
        const alerts = await alertModel.getAlertThresholds();
        res.render('stock_alert', {alerts, user: req.session.user});
        
    } catch (error) {
        console.error('Error in Adding Alert Threshold:', error);
        res.status(500).send('Internal Server Error');
    }
    
}

exports.editAlertThreshold = async (req, res) => {
    const { alert_id, threshold, day_before_expiry } = req.body;
    try {
        await alertModel.editAlertThreshold(threshold, day_before_expiry, alert_id);
        req.flash('success', 'Alert Threshold Edited Successfully!');
        
        const alerts = await alertModel.getAlertThresholds();
        const lowalerts = await alertModel.getLowStockAlerts();
        const expiryalerts = await alertModel.getExpiryAlerts();
        res.render('stock_alert', {alerts, expiryalerts, lowalerts, user: req.session.user});
        
    } catch (error) {
        console.error('Error in Adding Alert Threshold:', error);
        res.status(500).send('Internal Server Error');
    }

}





