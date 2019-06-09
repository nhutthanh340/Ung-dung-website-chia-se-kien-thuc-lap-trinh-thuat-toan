const TheLoai = require('../models/TheLoai');

exports.ShowAllBlog = async function (req, res) {
    const type = await TheLoai.readAllType();
    const json = JSON.parse(JSON.stringify(type));
    res.render('blog', {user: req.user, type: json});
}

exports.DetailBlog = async function (req, res) {
    const type = await TheLoai.readAllType();
    const json = JSON.parse(JSON.stringify(type));
    res.render('single-blog', {user: req.user, type: json});
}