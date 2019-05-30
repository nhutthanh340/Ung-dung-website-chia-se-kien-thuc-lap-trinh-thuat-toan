var express = require('express');
var router = express.Router();

var home = require("../controller/HomeController");
var baidang = require("../controller/BaiDangController");
var baiviet = require("../controller/BaiVietController");
var admin = require("../controller/AdminControlers");
var logIn = require("../controller/DangNhapController");
var signUp = require("../controller/DangKyController");

router.get('/index', home.HomePage);
router.get('/', home.HomePage);

router.get('/admin/admin', admin.showAdmin);
router.get('/baidang/baidang', baidang.ShowBaiDang);
router.get('/baidang/editBaiDang', baidang.EditBaiDang);
router.get('/baiviet/baiviet', baiviet.ShowBaiViet);
router.get('/baiviet/editBaiViet', baiviet.EditBaiViet);

router.get('/login', logIn.ShowFormDangNhap);
router.get('/signup', signUp.ShowFormDangKy);


module.exports = router;