const express = require('express');
const router = express.Router();

const home = require("../controller/HomeController");
const baidang = require("../controller/BaiDangController");
const baiviet = require("../controller/BaiVietController");
const admin = require("../controller/AdminControlers");
const logIn = require("../controller/DangNhapController");
const signUp = require("../controller/DangKyController");

router.get('/index', home.HomePage);
router.get('/', home.HomePage);

router.get('/admins', admin.showAdmin);
router.get('/danhsachbaidang', baidang.ShowBaiDang);
router.get('/danhsachbaidang/editBaiDang/:id', baidang.EditBaiDang);
router.get('/danhsachbaiviet', baiviet.ShowBaiViet);
router.get('/danhsachbaiviet/editBaiViet/:id', baiviet.EditBaiViet);

router.get('/login', logIn.ShowFormDangNhap);
router.get('/signup', signUp.ShowFormDangKy);


module.exports = router;