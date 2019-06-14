const Connection = require('../models/MySQL').connection;

exports.readAll = async function (loainguoidung) {
    const result = await Connection.promise().query('select * from nguoidung where idloainguoidung = ?', [loainguoidung]);
    return result[0];
};

exports.read = async function (tendangnhap) {
    const result = await Connection.promise().query('select * from nguoidung where tendangnhap = ?', [tendangnhap]);
    return result[0][0];
};

exports.delete = async function (tendangnhap) {
    return await Connection.promise().query('delete from nguoidung where tendangnhap=?', tendangnhap);
};

exports.insert = async function (data) {
    return await Connection.promise().query('insert into nguoidung set ?', data);
};

exports.update = async function (data, id) {
    return await Connection.promise().query('update nguoidung set ? where id=?', [data, id]);
};