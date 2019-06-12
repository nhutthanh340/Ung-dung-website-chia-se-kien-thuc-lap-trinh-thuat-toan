const TheLoai = require('../models/TheLoaiBaiViet');
const BaiViet = require('../models/BaiViet');

exports.FormGuiBaiViet = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('guibaiviet', {user: req.user, type});
};

exports.XemBaiViet = async function (req, res) {
    const type = await TheLoai.readAll();
    const baiviet = await BaiViet.readAnhGetNamePostType(req.user.id);
    res.render('xembaiviet', {user: req.user, type, baiviet});
};

exports.ThemBaiViet = async (req, res) => {
    req.body.idnguoigui = req.user.id;
    await BaiViet.insert(req.body);
    res.redirect('/index');
};