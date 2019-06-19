const TheLoai = require('../models/TheLoaiBaiViet');
const BinhLuan = require('../models/BinhLuan');
const fs = require('fs');

const BaiDang = require('../models/BaiDang');

exports.ShowPostByType = async function (req, res) {
    const idTypePost = req.params.id;
    const post = await BaiDang.readByTypePost(idTypePost);

    const name = await BaiDang.readNameType(idTypePost);
    const nametype = JSON.parse(JSON.stringify(name[0]));

    const type = await TheLoai.readAll();
    res.render('baidang', {user: req.user, type: type, post: post, nametype});
};

exports.DetailBlog = async function (req, res) {
    const Content = await fs.readFileSync('NoiDungBaiViet/1.html');
    const type = await TheLoai.readAll();
    const idPost = req.params.id;

    const detail_1 = await BaiDang.readDetailBlogById(idPost);
    const detail = JSON.parse(JSON.stringify(detail_1[0]));

    const comment = await BaiDang.readTableCommentByIdPost(idPost);
    res.render('single-blog', {user: req.user, type, detail, Content, comment});
};

exports.searchBlog = async function (req, res) {
    const nameSearch = req.body.nameSearch;
    const blog = await BaiDang.searchByName(nameSearch);
    const type = await TheLoai.readAll();
    res.render('baidang', {user: req.user, type: type, post: blog});
};

exports.PostComment = async function (req, res) {
    const type = await TheLoai.readAll();
    const idPost = req.params.id;
    const detail_1 = await BaiDang.readDetailBlogById(idPost);
    const detail = JSON.parse(JSON.stringify(detail_1[0]));
    const comment = await BaiDang.readTableCommentByIdPost(idPost);
    const result = await BaiDang.insertTableComment(req.user.id, idPost, req.body.comment);
    res.redirect('/index');
};