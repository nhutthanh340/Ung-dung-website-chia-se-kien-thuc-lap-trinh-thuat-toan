var express = require('express');
var router = express.Router();

var HomePage = require("../controllers/HomeController");
var BaiDang = require("../controllers/BaiDangController");
var Contact = require("../controllers/LienHeController");
var DangNhap = require("../controllers/DangNhapController");
var DangKy = require("../controllers/DangKyController");
var BaiViet = require("../controllers/BaiVietController");
var CapNhatThongTin = require("../controllers/UpdateThongTinController");

router.get('/index', HomePage.HomePage);
router.get('/GuiBaiViet', BaiViet.GuiBaiViet);
router.get('/blog', BaiDang.ShowAllBlog);
router.get('/single-blog', BaiDang.DetailBlog);
router.get('/contact', Contact.ShowContact);
router.get('/login', DangNhap.ShowFormDangNhap);
router.get('/sign-up', DangKy.ShowFormDangKy);
router.get('/updateInfor', CapNhatThongTin.ShowFormUpdate);


module.exports = router;
