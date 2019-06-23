const Connection = require('../model/MySQL').connection;

exports.readAllPost = async function () {
    const sql = 'select BV.id, BV.trangthai, BV.tenbaiviet, ND.hoten, TL.tentheloai from nguoidung ND, baiviet BV, theloaibaiviet TL where BV.idtheloaibaiviet = TL.id and BV.idnguoigui = ND.id';
    const result = await Connection.promise().query(sql);
    return result[0];
};

exports.updateOnePostByID = async function (data, id) {
    return await Connection.promise().query('update baiviet set ? where id=?', [data, id]);
};

exports.getOnePostById = async function (id) {
    const sql = 'select * from  baiviet where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.getNameTypeById = async function (id) {
    const sql = 'select * from  theloaibaiviet where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.getUsernameById = async function (id) {
    const sql = 'select * from  nguoidung where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

