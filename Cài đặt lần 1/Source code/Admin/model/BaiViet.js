const connection = require('MySQL');
const BaiVietModel = new connection({table:'baiviet'});

exports.BaiVietModel = BaiVietModel;
