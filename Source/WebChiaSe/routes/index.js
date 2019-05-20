var express = require('express');
var router = express.Router();

var HomePage = require("../controllers/HomeController");
var BaiDang = require("../controllers/BaiDangController");
var Contact = require("../controllers/LienHeController");
var DangNhap = require("../controllers/DangNhapController");
var DangKy = require("../controllers/DangKyController");

router.get('/index', HomePage.HomePage);
router.get('/blog', BaiDang.ShowAllBlog);
router.get('/single-blog', BaiDang.DetailBlog);
router.get('/contact', Contact.ShowContact);
router.get('/login', DangNhap.ShowFormDangNhap);
router.get('/sign-up', DangKy.ShowFormDangKy);


module.exports = router;
