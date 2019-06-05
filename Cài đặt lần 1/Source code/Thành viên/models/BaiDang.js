const connection = require('MySQL');
const BaiDangModel = new connection({table:'baidang'});

exports.BaiDangModel = BaiDangModel;