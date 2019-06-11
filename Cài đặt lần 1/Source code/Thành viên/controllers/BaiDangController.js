const TheLoai = require('../models/TheLoaiBaiViet');
const BaiDang = require('../models/BaiDang');

exports.ShowPostByType = async function (req, res) {
    const idTypePost = req.params.id;
    const post = await BaiDang.readByTypePost(idTypePost);
    const type = await TheLoai.readAll();
    console.log(post);
    res.render('baidang', {user: req.user, type: type, post: post});
};

exports.DetailBlog = async function (req, res) {
    const idPost = req.params.id;
    const detail_1 = await BaiDang.readDetailPostById(idPost);
    const detail = JSON.parse(JSON.stringify(detail_1[0]));
    const type = await TheLoai.readAll();
    res.render('single-blog', {user: req.user, type, detail});
};