const express = require('express');
const router = express.Router();

const home = require("../controller/HomeController");
const baidang = require("../controller/BaiDangController");
const baiviet = require("../controller/BaiVietController");
const admin = require("../controller/AdminControlers");

router.get('/index', home.HomePage);
router.get('/', home.HomePage);

router.get('/update', admin.isLoggedIn, admin.FormUpdate);
router.get('/signup', admin.FormSignUp);
router.get('/login', admin.FormLogIn);
router.get('/logout', admin.logout);
router.get('/baidang', admin.isLoggedIn, baidang.ShowBaiDang);
router.get('/baidang/editBaiDang', admin.isLoggedIn, baidang.EditBaiDang);
router.get('/baiviet', admin.isLoggedIn, baiviet.ShowBaiViet);
router.get('/baiviet/editBaiViet/', admin.isLoggedIn, baiviet.EditBaiViet);

router.post('/signup', admin.registerPost);
router.post('/login', admin.Authenticate);
router.post('/updateAdmin/:id', admin.isLoggedIn, admin.PostUpdateUserInformation);

module.exports = router;