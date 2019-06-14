const Connection = require('../models/MySQL').connection;

exports.getHomePage = async function () {
    const sql = 'select ND.hoten, BD.id, BD.ngaydang, BV.tenbaiviet from nguoidung ND, baidang BD, baiviet BV where ND.id=BV.idnguoigui and BV.id=BD.idbaiviet and BV.idtheloaibaiviet = 1 limit 6';
    const result = await Connection.promise().query(sql);
    return result[0];
};