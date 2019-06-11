const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/NguoiDung');
const saltRounds = 10;
const TheLoai = require('../models/TheLoaiBaiViet');
const nodeMailer = require('nodemailer');
const querystring = require('querystring');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function (path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dien email vao day',
        pass: 'dien mat khau vao day'
    }
});

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
    const str = querystring.stringify(req.body);
    readHTMLFile('views/email.html', function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            URL: "http://localhost:3000/Verify/" + str
        };
        const htmlToSend = template(replacements);
        let mailOptions = {
            from: 'dien email vao day', // sender address
            to: req.body.email, // list of receivers
            subject: 'Kích hoạt tài khoản LearnIT', // Subject line
            html: htmlToSend // html body
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            const type = await TheLoai.readAll();
            res.render("ConfirmationEmail", {email: req.body.email, type});
        });
    });
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
    if (nguoidung === undefined) {
        res.send(true);
    } else {
        res.send(false);
    }
};


exports.Verify = async function (req, res) {
    const param = req.params.Verify;
    const object = querystring.parse(param);
    const nguoidung = await User.read(object.tendangnhap);
    if (nguoidung === undefined) {
        await User.insert(object);
    }
    res.redirect('/');
};

exports.CancelFollow = async function (req, res) {
    req.user.theodoi = 0;
    await User.update(req.user);
    res.redirect('/');
};
