const logModel = require('../models/logModel');

exports.getAllLogs = async (req, res) => {
    try {
        const stockadjs = await logModel.getStockAdjustmentLogs();
        const stockmvmnt = await logModel.getStockMovementLogs();
        const activitylogs = await logModel.getActivityLogs();
        req.session.user = req.session.user;

        return res.render('logs', { stockadjs, stockmvmnt, activitylogs, user: req.session.user });

    } catch (error) {
        console.error('Error in Showing Logs:', error);
        res.status(500).send('Internal Server Error');
    }
}