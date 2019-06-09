const TheLoai = require('../models/TheLoai');

exports.ShowContact = async function (req, res) {
    const type = await TheLoai.readAllType();
    const json = JSON.parse(JSON.stringify(type));
    res.render('contact', {user: req.user, type: json});
}