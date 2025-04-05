const userModel = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.render('user-management', {users});
        
    } catch (error) {
        console.error('Error fetching Users:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.updateUserRole = async (req, res) => {
    console.log(req.body);
    const {userRole, user_id} = req.body;
    try {
        await userModel.updateUserRole(userRole, user_id);
        req.flash('success', 'User Role Updated Successfully!');
        req.session.user = req.session.user;

        const users = await userModel.getUsers();
        return res.render('user-management', { users });

    } catch (error) {
        console.log('Error in Updating User Roles', error);
        res.status(500).send('Internal Server Error');
    }
}