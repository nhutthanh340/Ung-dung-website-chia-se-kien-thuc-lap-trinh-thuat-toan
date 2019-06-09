const Connection = require('../models/MySQL').connection;
const bcrypt = require('bcrypt');

exports.readAllUser = async function () {
    const result = await Connection.promise().query('select * from nguoidung where idloainguoidung = ?', [1]);
    return result[0];
};

exports.readOneUser = async function (email) {
    const result = await Connection.promise().query('select * from nguoidung where idloainguoidung = ? and email = ?', [1, email]);
    return result[0];
};

exports.checkEmailExist = async function (email) {
    const sql = "SELECT COUNT(*) AS cnt FROM nguoidung WHERE email = ? ";
    const result = await Connection.promise().query(sql, email);
    return result[0].cnt === 0;
};

exports.insertNewUser = async function (hoten, tendangnhap, email, trinhdohocvan, matkhau, ngaysinh, idloainguoidung) {
    const hash = await bcrypt.hash(matkhau, 10);
    const sqlInsert = "INSERT INTO nguoidung(hoten,tendangnhap,email,trinhdohocvan,matkhau,ngaysinh,idloainguoidung) VALUES (?,?,?,?,?,?,?)";
    const result = await Connection.promise().query(sqlInsert, [hoten, tendangnhap, email, trinhdohocvan, hash, ngaysinh, idloainguoidung]);
    return result;
};

exports.validPassword = async (email, password) => {
    const sql = "SELECT * FROM nguoidung WHERE email = ? AND idloainguoidung = ?";
    const admin = await Connection.promise().query(sql, [email, 1]);

    var json = JSON.parse(JSON.stringify(admin[0]));

    if (admin[0].length === 0)
        return false;
    return await bcrypt.compare(password, json[0].matkhau);
};

exports.updateUserInformation = async function (id, hoten, tendangnhap, trinhdohocvan, ngaysinh) {
    const sqlUpdate = "UPDATE nguoidung SET hoten = ?, tendangnhap = ?, trinhdohocvan = ?, ngaysinh = ? WHERE id = ?";
    const result = await Connection.promise().query(sqlUpdate, [hoten, tendangnhap, trinhdohocvan, ngaysinh, id]);
    return result;
};