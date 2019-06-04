const connection = require('MySQL');
const BaiVietModel = new connection({table:'BaiViet'});

exports.BaiVietModel = BaiVietModel;
