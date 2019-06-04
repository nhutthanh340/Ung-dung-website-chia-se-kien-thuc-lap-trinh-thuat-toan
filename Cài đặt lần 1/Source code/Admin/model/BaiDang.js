const connection = require('MySQL');
const BaiDangModel = new connection({table:'BaiDang'});

exports.BaiDangModel = BaiDangModel;