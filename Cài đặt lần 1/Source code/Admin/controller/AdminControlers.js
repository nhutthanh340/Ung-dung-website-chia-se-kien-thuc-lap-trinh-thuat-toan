const bcrypt = require('bcrypt');
const passport = require('passport');
const Connection = require('../model/MySQL').connection;
const Admin = require('../model/Admin');

exports.FormSignUp = async function (req, res) {
    res.render('signup', {admin: req.user});
};

exports.FormLogIn = async function (req, res) {
    res.render('login', {admin: req.user});
};

exports.FormUpdate = async function (req, res) {
    res.render('admin/admin', {admin: req.user});
};

exports.registerPost = async (req, res) => {
    const password = req.body.matkhau;
    const email = req.body.email;
    const DOB = req.body.ngaysinh;
    const hoten = req.body.hoten;
    const tendangnhap = req.body.tendangnhap;
    const trinhdohocvan = req.body.trinhdohocvan;

    const isExist = await Admin.checkEmailExist(email);

    if (isExist)
        res.render('signup', {message: 'Email đã tồn tại'});
    else {
        if ((password.toString().length >= 8)) {
            res.redirect('/login');
            const result = await Admin.insertNewAdmin(hoten, tendangnhap, email, trinhdohocvan, password, DOB, 2);
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

    const result = await Admin.updateAdminInformation(id, hoten, tendangnhap, trinhdohocvan, DOB);
    res.redirect('/index');
};