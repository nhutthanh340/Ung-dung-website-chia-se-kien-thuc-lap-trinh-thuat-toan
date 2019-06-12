const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const AdminModel = require('./model/Admin');

const Connection = require('./model/MySQL').connection;
const AdminController = require('./controller/AdminControlers');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'matkhau'
}, async function (username, password, done) {
    try {
        const sql = "SELECT * FROM nguoidung WHERE email = ? AND idloainguoidung = ?";
        const admin = await Connection.promise().query(sql, [username, 2]);
        if (admin[0].length === 0) {
            return done(null, false, ({message: 'Incorrect username.'}));
        }
        const isPasswordValid = await AdminModel.validPassword(username, password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return done(null, false, ({message: 'Incorrect password.'}));
        }
        const json = JSON.parse(JSON.stringify(admin[0]));
        return done(null, json[0]);
    } catch (ex) {
        return done(ex);
    }
}));


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "meo cats", saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (admin, done) {
    done(null, admin.email);
});

passport.deserializeUser(async function (email, done) {
    const sql = "SELECT * FROM nguoidung WHERE email = ? AND idloainguoidung = ?";
    const admin = await Connection.promise().query(sql, [email, 2]);
    const json = JSON.parse(JSON.stringify(admin[0]));
    done(undefined, json[0]);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
