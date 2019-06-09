const Connection = require('../models/MySQL').connection;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.readAll = async function (loainguoidung) {
    const result = await Connection.promise().query('select * from nguoidung where idloainguoidung = ?',[loainguoidung]);
    return result[0];
};

exports.read = async function (email) {
    const result = await Connection.promise().query('select * from nguoidung where email=?', [email]);
    return result[0][0];
};

exports.delete = async function (email) {
    return await Connection.promise().query('delete from nguoidung where email=?', email);
};

exports.insert = async function (data) {
    return await Connection.promise().query('insert into nguoidung set ?', data);
};

exports.update = async function (data) {
    return await Connection.promise().query('update nguoidung set ?', data);
};

exports.checkEmailExist = async function (email) {
    const sql = "SELECT COUNT(*) AS cnt FROM nguoidung WHERE email = ? ";
    const result = await Connection.promise().query(sql, email);
    if (result[0].cnt === 0)
        return true;
    return false;
};