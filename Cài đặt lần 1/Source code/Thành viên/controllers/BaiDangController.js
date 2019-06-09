const TheLoai = require('../models/TheLoaiBaiViet');

exports.ShowAllBlog = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('blog', {user: req.user, type});
};

exports.DetailBlog = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('single-blog', {user: req.user, type});
};