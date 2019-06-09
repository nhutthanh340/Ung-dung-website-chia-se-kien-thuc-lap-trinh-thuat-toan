const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/NguoiDung');
const saltRounds = 10;

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
    req.body.idloainguoidung = 1;
    req.body.matkhau = await bcrypt.hash(req.body.matkhau, saltRounds);
    await User.insert(req.body);
    res.redirect('/login');
};

exports.LocalStrategy = async function (username, password, done) {
    const thanhvien = await User.read(username);
    let result;
    try {
        result = await bcrypt.compare(password, thanhvien.matkhau);
    } catch (e) {
        return done(null, false);
    }
    if (result) {
        return done(null, username);
    } else {
        return done(null, false);
    }
};

exports.Authenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/index',
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (email, done) {
    const user = await User.read(email);
    const json = JSON.parse(JSON.stringify(user));
    done(undefined, json);
});
exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/index');
};

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

exports.PostUpdateUserInformation = async function (req, res) {
    await User.update(req.body);
    res.redirect('/index');
};

