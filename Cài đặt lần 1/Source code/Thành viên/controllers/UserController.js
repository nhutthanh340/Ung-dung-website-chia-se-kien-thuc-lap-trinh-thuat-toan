const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/NguoiDung');
const saltRounds = 10;
const TheLoai = require('../models/TheLoaiBaiViet');

exports.FormSignUp = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('signup', {type});
};

exports.FormLogIn = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('login', {type});
};

exports.FormUpdate = async function (req, res) {
    const type = await TheLoai.readAll();
    res.render('updateInfor', {user: req.user, type});
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

passport.deserializeUser(async function (tendangnhap, done) {
    done(undefined, await User.read(tendangnhap));
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

exports.CheckUserName = async function (req, res) {
  const nguoidung = await User.read(req.body.tendangnhap);
    if (nguoidung === undefined)
  {
      res.send(true);
  }else {
      res.send(false);
  }
};
