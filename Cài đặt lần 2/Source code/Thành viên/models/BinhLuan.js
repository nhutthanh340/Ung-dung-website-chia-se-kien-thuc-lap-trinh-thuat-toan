const Connection = require('../models/MySQL').connection;

exports.read = async function (idnguoidung, idbaidang) {
    const result = await Connection.promise().query('select * from binhluan where idnguoidung=? and idbaidang=?', [idnguoidung, idbaidang]);
    return result[0];
};