const TheLoai = require('../models/TheLoaiBaiViet');
const Home = require('../models/Home');

exports.HomePage = async function (req, res) {
    const type = await TheLoai.readAll();
    const blog = await Home.getHomePage();
    res.render('index', {user: req.user, type, blog});
};