const bcrypt = require('bcrypt');
const passport = require('passport');
const Connection = require('../models/MySQL').connection;
const User = require('../models/NguoiDung');

exports.FormSignUp = async function (req, res) {
    res.render('signup', {user: req.user});
};

exports.FormLogIn = async function (req, res) {
    res.render('login', {user: req.user});
};

exports.FormUpdate = async function (req, res) {
    res.render('updateInfor', {user: req.user});
};

exports.registerPost = async (req, res) => {
    const password = req.body.matkhau;
    const email = req.body.email;
    const DOB = req.body.ngaysinh;
    const hoten = req.body.hoten;
    const tendangnhap = req.body.tendangnhap;
    const trinhdohocvan = req.body.trinhdohocvan;
    const hash = await bcrypt.hash(password, 10);

    const isExist = await User.checkEmailExist(email);

    if (isExist)
        res.render('signup', {message: 'Email đã tồn tại'});
    else {
        if ((password.toString().length >= 8)) {
            res.redirect('/login');
            const result = await User.insertNewUser(hoten, tendangnhap, email, trinhdohocvan, password, DOB, 1);
        } else {
            res.render('signup', {message: 'Mật khẩu phải lớn hơn 8 kí tự'});
        }
    }
};

exports.Authenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/index',
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/index');
};

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

exports.PostUpdateUserInformation = async function (req, res) {
    const DOB = req.body.ngaysinh;
    const hoten = req.body.hoten;
    const tendangnhap = req.body.tendangnhap;
    const trinhdohocvan = req.body.trinhdohocvan;
    const id = req.params.id;

    const result = await User.updateUserInformation(id, hoten, tendangnhap, trinhdohocvan, DOB);
    res.redirect('/index');
};

