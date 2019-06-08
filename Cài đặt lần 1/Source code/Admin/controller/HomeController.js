exports.HomePage = function (req, res) {
    res.render('index',{admin: req.user});
};