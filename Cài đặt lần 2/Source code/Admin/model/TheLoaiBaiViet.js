const Connection = require('../models/MySQL').connection;


exports.getTenLoai = async function (id) {
    const sql = 'select * from theloaibaiviet where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};