const connection = require('MySQL');
const NguoiDungModel = new connection({table:'nguoidung'});

exports.NguoiDungModel = NguoiDungModel;