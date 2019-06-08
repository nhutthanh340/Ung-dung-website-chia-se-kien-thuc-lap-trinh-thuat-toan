exports.ShowContact = function (req, res) {
    res.render('contact', {user: req.user});
}