const BaiDang= require('../model/BaiDang');

exports.HomePage = async function (req, res) {
    const result = await BaiDang.readAllBlog();
    const baidang = JSON.parse(JSON.stringify(result));
    res.render('index',{admin: req.user, baidang});
};