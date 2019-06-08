exports.ShowAllBlog = function (req, res) {
    res.render('blog', {user: req.user});
}

exports.DetailBlog = function (req, res) {
    res.render('single-blog', {user: req.user});
}