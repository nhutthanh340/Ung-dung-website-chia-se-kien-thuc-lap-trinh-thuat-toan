const Connection = require('../model/MySQL').connection;

exports.insertBaiDang = async function (id, date) {
    const sqlInsertBlog = 'INSERT INTO baidang(idbaiviet,ngaydang) VALUES(?,?)';
    await Connection.promise().query(sqlInsertBlog, [id, date]);
};

exports.readByTypePost = async function (id) {
    const sql = 'select * from  baidang BD, baiviet BV where BV.id=BD.idbaiviet and BV.idtheloaibaiviet = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.readIdPostFromBlog = async function (id) {
    const sql = 'select * from  baidang where id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};


exports.readAllBlog = async function () {
    const sql = "select ND.hoten, BD.id, BV.tenbaiviet, BV.tomtat, TL.tentheloai from nguoidung ND, baidang BD, baiviet BV, theloaibaiviet TL where BV.idtheloaibaiviet = TL.id and BD.idbaiviet=BV.id and ND.id=BV.idnguoigui";
    const result = await Connection.promise().query(sql);
    return result[0];
};

exports.readContentPostByIdBlog = async function (id) {
    const sql = "select BV.id, BV.tenbaiviet, BV.tomtat, BV.noidung from baiviet BV, baidang BD where BV.id=BD.idbaiviet and BV.id = ?";
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.deleteBlog = async function (idBD, idBV) {
    const sqlCmt = "delete from binhluan where idbaidang = ?";
    const resultCmt = await Connection.promise().query(sqlCmt, idBD);

    const sqlBD = "delete from baidang where id = ?";
    const resultBD = await Connection.promise().query(sqlBD, idBD);

    const sqlBV = "delete from baiviet where id = ?";
    const resultBV = await Connection.promise().query(sqlBV, idBV);
};