const authModel = require('../models/authModel');
const logModel = require('../models/logModel');
const bcrypt = require('bcrypt');


exports.user_register = async (req, res) => {
    const {username, password, confirm_password, role, email} = req.body;

    if(!username || !password || !confirm_password || !role || !email) {
        return res.status(400).send('All fields are required!');
    }

    if(password !== confirm_password){
        req.flash('error', 'Password do not match');
        return res.redirect('/register');
    }

    try {
        const userExist = await authModel.findUsername(username);
        if (userExist) {
            req.flash('error', 'Username already Exist please use another one');
            return res.redirect('/register');
        }

        const emailExist = await authModel.findEmail(email);
        if(emailExist) {
            req.flash('error', 'Email already exist please use another one');
            return res.redirect('/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await authModel.registerUser(username, hashedPassword, role, email);

        req.flash('success', 'Registration successful! Please log in.');
        return res.redirect('/login');

    } catch (error) {
         console.log('Registration Error', error);
        res.status(500).send('internal server error');
    }
};

exports.user_login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        req.flash('error', 'Username and Password are required');
        return res.redirect('/login');
    }

    try {
        const user = await authModel.findUsername(username);

        if(!user){
            req.flash('error', 'Invalid credentials!');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(400).send('Invalid credentials!');
        }

        req.session.user = user;

        user_id = user.id;
        action_type = 'logged_in';
        action_details = `${user.username} has logged in.`;

        await logModel.addActivityLog(user_id, action_type, action_details);

        res.redirect('/homepage');
        
    } catch (error) {
        console.log('Login Error' + error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.user_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Could not log out. Try again.');
        }
        res.redirect('/login');  // Redirect to login after logout
    });
};




