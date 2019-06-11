const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserController = require('./controllers/UserController');

const indexRouter = require('./routes/index');

passport.use(new LocalStrategy({
    usernameField: 'tendangnhap',
    passwordField: 'matkhau'
}, UserController.LocalStrategy));


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
app.use(function (req, res, next) {
   res.locals.isAuthenticated = req.isAuthenticated();
   next();
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
