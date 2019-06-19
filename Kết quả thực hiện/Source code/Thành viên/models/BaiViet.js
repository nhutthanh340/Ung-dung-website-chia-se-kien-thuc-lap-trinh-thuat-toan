const Connection = require('../models/MySQL').connection;

exports.get1 = function () {
    let script = document.createElement("script");
    script.src = "//cdn.ckeditor.com/4.11.4/full/ckeditor.js";
    let a = CKEDITOR.instances["noidung"].getData();
    console.log("func: " + a);
    return a;
};

exports.insert = async function (data) {
    return await Connection.promise().query('insert into baiviet set ?', data);
};
exports.delete = async function (id) {
    return await Connection.promise().query('delete from baiviet where id= ?', id);
};

exports.update = async function (data) {
    return await Connection.promise().query('update baiviet set ?', data);
};

exports.readAll = async function () {
    const result = await Connection.promise().query('select * from baiviet');
    return result[0];
};

exports.readAnhGetNamePostType = async function (id) {
    const sql = 'select BV.id, TL.tentheloai, BV.tenbaiviet, BV.trangthai from baiviet BV, theloaibaiviet TL where BV.idtheloaibaiviet=TL.id and' +
        ' BV.idnguoigui=?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.readAll = async function (idnguoigui) {
    const result = await Connection.promise().query('select * from baiviet where idnguoigui=?', idnguoigui);
    return result[0];
};

exports.read = async function (id) {
    const result = await Connection.promise().query('select * from baiviet where id=?', id);
    return result[0][0];
};