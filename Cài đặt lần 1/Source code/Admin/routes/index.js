const express = require('express');
const router = express.Router();

const home = require("../controller/HomeController");
const baidang = require("../controller/BaiDangController");
const baiviet = require("../controller/BaiVietController");
const admin = require("../controller/AdminControlers");

router.get('/index', admin.isLoggedIn, home.HomePage);
router.get('/', admin.isLoggedIn, home.HomePage);

router.get('/update', admin.isLoggedIn, admin.FormUpdate);
router.get('/signup', admin.FormSignUp);
router.get('/login', admin.FormLogIn);
router.get('/logout', admin.logout);
router.get('/baidang', admin.isLoggedIn, baidang.ShowBaiDang);
router.get('/baidang/edit/:id', baidang.FormEditBaiDang);
router.get('/baiviet', admin.isLoggedIn, baiviet.ShowBaiViet);
router.get('/baiviet/edit/:id', baiviet.FormEditBaiViet);
router.get("/baidang/delete/:id", baidang.DeleteBaiDang);

router.post('/signup', admin.registerPost);
router.post('/login', admin.Authenticate);
router.post('/updateAdmin/:id', admin.isLoggedIn, admin.PostUpdateUserInformation);
router.post("/updateBaiViet/:id", baiviet.PostUpdateBaiViet);
router.post("/updateBaiDang/:id", baidang.PostUpdateBaiDang);


module.exports = router;