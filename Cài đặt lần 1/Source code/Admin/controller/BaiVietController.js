const BaiViet = require('../model/BaiViet');
const BaiDang = require('../model/BaiDang');
const date = require('date-and-time');


exports.ShowBaiViet = async function (req, res) {
    const baiviet = await BaiViet.readAllPost();
    const jsonbaiviet = JSON.parse(JSON.stringify(baiviet));
    res.render('baiviet/baiviet', {admin: req.user, baiviet: jsonbaiviet});
};

exports.FormEditBaiViet = async function (req, res) {
    const id = req.params.id;
    const baiviet = await BaiViet.getOnePostById(id);
    const jsonbaiviet = JSON.parse(JSON.stringify(baiviet));

    const nametype = await BaiViet.getNameTypeById(jsonbaiviet[0].idtheloaibaiviet);
    const jsonnametype = JSON.parse(JSON.stringify(nametype));

    const username = await BaiViet.getUsernameById(jsonbaiviet[0].idnguoigui);
    const jsonusername = JSON.parse(JSON.stringify(username));
    res.render('baiviet/editBaiViet', {
        admin: req.user,
        baiviet: jsonbaiviet[0],
        nametype: jsonnametype[0],
        username: jsonusername[0]
    });
};

exports.PostUpdateBaiViet = async function (req, res) {
    const id = req.params.id;
    let now = new Date();
    date.format(now, 'YYYY-MM-DD');
    await BaiViet.updateOnePostByID(req.body, id);
    await BaiDang.insertBaiDang(id, now);
    res.redirect('/index');
};