const TheLoai = require('../models/TheLoaiBaiViet');

exports.ShowContact = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('contact', {user: req.user, type});
};