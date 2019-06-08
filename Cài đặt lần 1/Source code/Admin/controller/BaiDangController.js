exports.ShowBaiDang = function (req, res) {
    res.render('baidang/baidang', {admin: req.user});
}

exports.EditBaiDang = function (req, res) {
    res.render('baidang/editBaiDang', {admin: req.user});
}