const TheLoai = require('../models/TheLoaiBaiViet');
const LuotThich = require('../models/LuotThich');
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
    const type = await TheLoai.readAll();
    const idPost = req.params.id;
    let likes = await LuotThich.readAll();
    const detail_1 = await BaiDang.readDetailBlogById(idPost);
    const detail = JSON.parse(JSON.stringify(detail_1[0]));

    const Content = await fs.readFileSync(detail.noidung);
    const Summary = await fs.readFileSync(detail.tomtat);

    let coThich=0;
    try {
        coThich = await LuotThich.read(req.user.id,detail.id);
    }catch (e) {}

    const comment = await BaiDang.readTableCommentByIdPost(idPost);
    res.render('single-blog', {user: req.user, type, detail, Content,Summary, comment,likes,coThich});
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