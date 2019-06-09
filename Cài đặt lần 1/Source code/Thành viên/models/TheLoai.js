const Connection = require('../models/MySQL').connection;

exports.readAllType = async function () {
    const result = await Connection.promise().query('select * from theloaibaiviet');
    return result[0];
};

exports.getTenLoai = async function (id) {
    const sql = 'select * from theloaibaiviet where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};