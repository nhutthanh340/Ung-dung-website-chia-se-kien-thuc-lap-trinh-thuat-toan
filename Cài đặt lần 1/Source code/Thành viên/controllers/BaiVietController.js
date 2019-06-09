const TheLoai = require('../models/TheLoai');
const BaiViet = require('../models/BaiViet');
const User = require('../models/NguoiDung');

exports.FormGuiBaiViet = async function (req, res) {
    const type = await TheLoai.readAllType();
    const json = JSON.parse(JSON.stringify(type));
    res.render('guibaiviet', {user: req.user, type: json});
};

exports.XemBaiViet = async function (req, res) {
    const type = await TheLoai.readAllType();
    const jsontheloai = JSON.parse(JSON.stringify(type));

    const baiviet = await BaiViet.readAllBaiViet(req.user.email);
    const jsonbaiviet = JSON.parse(JSON.stringify(baiviet));

    res.render('xembaiviet', {user: req.user, type: jsontheloai, baiviet: jsonbaiviet});
};

exports.ThemBaiViet = async (req, res) => {
    const getID = await User.readOneUser(req.user.email);
    const id = JSON.parse(JSON.stringify(getID[0]));

    const tenbaiviet = req.body.tenbaiviet;
    const idtheloaibaiviet = req.body.idtheloaibaiviet;
    const noidung = req.body.noidung;
    const idnguoigui = id.id;

    const result = await BaiViet.InsertBaiViet(tenbaiviet, idtheloaibaiviet, noidung, idnguoigui);
    res.redirect('/index');
};