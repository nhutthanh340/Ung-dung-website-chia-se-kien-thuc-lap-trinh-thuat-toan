const TheLoai = require('../models/TheLoai');

exports.HomePage = async function (req, res) {
    const type = await TheLoai.readAllType();
    const json = JSON.parse(JSON.stringify(type));
    res.render('index', {user: req.user, type: json});
};