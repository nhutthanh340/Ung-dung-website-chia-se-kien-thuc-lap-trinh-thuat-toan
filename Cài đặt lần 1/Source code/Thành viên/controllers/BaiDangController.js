const TheLoai = require('../models/TheLoaiBaiViet');
const BinhLuan = require('../models/BinhLuan');
const fs = require('fs');
const BaiDang = require('../models/BaiDang');


exports.ShowAllBlog = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('blog', {user: req.user, type});
};

exports.DetailBlog = async function (req, res) {
    // const baidang = await BaiDang.read(req.params.id);
    const Content = await fs.readFileSync('NoiDungBaiViet/1.html');
    const type = await TheLoai.readAll();
    res.render('single-blog', {user: req.user, type, Content});
};