const express = require('express');
const router = express.Router();

const HomePage = require("../controllers/HomeController");
const BaiDang = require("../controllers/BaiDangController");
const Contact = require("../controllers/LienHeController");
const User = require("../controllers/UserController");
const BaiViet = require("../controllers/BaiVietController");

router.get('/index', HomePage.HomePage);
router.get('/', HomePage.HomePage);
router.get('/guibaiviet', User.isLoggedIn, BaiViet.FormGuiBaiViet);
router.get('/blog', BaiDang.ShowAllBlog);
router.get('/single-blog', BaiDang.DetailBlog);
router.get('/contact', Contact.ShowContact);
router.get('/login', User.FormLogIn);
router.get('/signup', User.FormSignUp);
router.get('/update', User.isLoggedIn, User.FormUpdate);
router.get('/logout', User.logout);
router.get('/xembaiviet', User.isLoggedIn, BaiViet.XemBaiViet);

router.post('/guibaiviet', BaiViet.ThemBaiViet);
router.post('/login', User.Authenticate);
router.post('/signup', User.registerPost);
router.post('/updateUser/:id', User.PostUpdateUserInformation);

module.exports = router;
