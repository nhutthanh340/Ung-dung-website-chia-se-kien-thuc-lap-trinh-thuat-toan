const bcrypt = require('bcrypt');
const passport = require('passport');
const Connection = require('../model/MySQL').connection;
const Admin = require('../model/Admin');
const LocalStrategy = require('passport-local').Strategy;

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

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'matkhau'
}, async function (username, password, done) {
    try {
        const admin = await Admin.readOneAdmin(username);
        if (admin.length === 0) {
            return done(null, false, ({message: 'Incorrect username.'}));
        }
        const isPasswordValid = await Admin.validPassword(username, password);
        if (!isPasswordValid) {
            return done(null, false, ({message: 'Incorrect password.'}));
        }
        const json = JSON.parse(JSON.stringify(admin[0]));
        return done(null, json);
    } catch (ex) {
        return done(ex);
    }
}));

passport.serializeUser(function (admin, done) {
    done(null, admin.email);
});

passport.deserializeUser(async function (email, done) {
    const admin = await Admin.readOneAdmin(email)
    const json = JSON.parse(JSON.stringify(admin[0]));
    done(undefined, json);
});