const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./models/NguoiDung');
const Connection = require('./models/MySQL').connection;
const UserController = require('./controllers/UserController');

const indexRouter = require('./routes/index');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'matkhau'
}, async function (username, password, done) {
    try {
        const sql = "SELECT * FROM nguoidung WHERE email = ? AND idloainguoidung = ?";
        const user = await Connection.promise().query(sql, [username, 1]);
        if (user[0].length === 0) {
            return done(null, false, ({message: 'Incorrect username.'}));
        }
        const isPasswordValid = await UserModel.validPassword(username, password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return done(null, false, ({message: 'Incorrect password.'}));
        }
        const json = JSON.parse(JSON.stringify(user[0]));
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

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    const sql = "SELECT * FROM nguoidung WHERE email = ? AND idloainguoidung = ?";
    const user = await Connection.promise().query(sql, [email, 1]);
    const json = JSON.parse(JSON.stringify(user[0]));
    done(undefined, json[0]);
});

app.use('/', indexRouter);

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
