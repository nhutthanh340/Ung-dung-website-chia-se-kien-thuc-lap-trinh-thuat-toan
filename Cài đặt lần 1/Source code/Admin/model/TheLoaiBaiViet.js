const connection = require('MySQL');
const TheLoaiBaiVietModel = new connection({table:'theloaibaiviet'});

exports.TheLoaiBaiVietModel = TheLoaiBaiVietModel;