exports.HomePage = function (req, res) {
    res.render('index', {user: req.user});
}