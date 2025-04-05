exports.login = (req, res) => {
    res.render('login');
};

exports.register = (req, res) => {
    res.render('register');
};

exports.landing = (req, res) => {
    res.render('landing');
};

exports.homepage = (req, res) => {
    res.render('homepage', {user: req.session.user});
};