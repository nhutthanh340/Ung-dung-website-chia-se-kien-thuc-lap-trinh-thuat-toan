const connection = require('MySQL');
const NguoiDungModel = new connection({table:'NguoiDung'});

exports.NguoiDungModel = NguoiDungModel;