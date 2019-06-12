const TheLoai = require('../models/TheLoaiBaiViet');

exports.HomePage = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('index', {user: req.user, type});
};