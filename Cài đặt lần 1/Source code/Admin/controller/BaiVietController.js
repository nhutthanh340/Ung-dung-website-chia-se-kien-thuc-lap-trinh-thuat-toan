exports.ShowBaiViet = function (req, res) {
    res.render('baiviet/baiviet', {admin: req.user});
}

exports.EditBaiViet = function (req, res) {
    res.render('baiviet/editBaiViet', {admin: req.user});
}