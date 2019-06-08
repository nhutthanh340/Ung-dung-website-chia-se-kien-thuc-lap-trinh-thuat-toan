exports.GuiBaiViet = function (req, res) {
    res.render('GuiBaiViet', {user: req.user});
}