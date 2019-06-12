const BaiDang = require('../model/BaiDang');
const BaiViet = require('../model/BaiViet');

exports.ShowBaiDang = async function (req, res) {
    const result = await BaiDang.readAllBlog();
    const baidang = JSON.parse(JSON.stringify(result));
    res.render('baidang/baidang', {admin: req.user, baidang});
};

exports.FormEditBaiDang = async function (req, res) {
    const id = req.params.id; // id bài đăng

    const resultGetIdPost = await BaiDang.readIdPostFromBlog(id);
    const jsonGetIdPost = JSON.parse(JSON.stringify(resultGetIdPost));

    const result = await BaiDang.readContentPostByIdBlog(jsonGetIdPost[0].idbaiviet);
    const baidang = JSON.parse(JSON.stringify(result[0]));
    res.render('baidang/editBaiDang', {admin: req.user, baidang});
};

exports.PostUpdateBaiDang = async function (req, res) {
    const id = req.params.id;
    await BaiViet.updateOnePostByID(req.body, id);
    res.redirect('/index');
};

exports.DeleteBaiDang = async function (req, res) {
    const id = req.params.id; // id bài đăng
    console.log(id);
    const resultGetIdPost = await BaiDang.readIdPostFromBlog(id);
    const jsonGetIdPost = JSON.parse(JSON.stringify(resultGetIdPost));

    const idBaiViet = jsonGetIdPost[0].idbaiviet;
    await BaiDang.deleteBlog(id, idBaiViet);
    res.redirect('/index');
};