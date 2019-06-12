const TheLoai = require('../models/TheLoaiBaiViet');
const BinhLuan = require('../models/BinhLuan');
const fs = require('fs');

const BaiDang = require('../models/BaiDang');

exports.ShowPostByType = async function (req, res) {
    const idTypePost = req.params.id;
    const post = await BaiDang.readByTypePost(idTypePost);
    const type = await TheLoai.readAll();
    res.render('baidang', {user: req.user, type: type, post: post});
};

exports.DetailBlog = async function (req, res) {
    const Content = await fs.readFileSync('NoiDungBaiViet/1.html');
    const type = await TheLoai.readAll();
    const idPost = req.params.id;
    const detail_1 = await BaiDang.readDetailBlogById(idPost);
    const detail = JSON.parse(JSON.stringify(detail_1[0]));
    res.render('single-blog', {user: req.user, type, detail, Content});
};

exports.searchBlog = async function (req, res) {
    const nameSearch = req.body.nameSearch;
    const blog = await BaiDang.searchByName(nameSearch);
    const type = await TheLoai.readAll();
    res.render('baidang', {user: req.user, type: type, post: blog});
};