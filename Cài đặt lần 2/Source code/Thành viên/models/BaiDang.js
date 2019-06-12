const Connection = require('../models/MySQL').connection;

exports.readAll = async function () {
    const result = await Connection.promise().query('select * from baidang');
    return result[0];
};

exports.read = async function (id) {
    const result = await Connection.promise().query('select * from baidang where id = ?', [id]);
    return result[0][0];
};

exports.delete = async function (id) {
    return await Connection.promise().query('delete from baidang where id=?', id);
};

exports.insert = async function (data) {
    return await Connection.promise().query('insert into baidang set ?', data);
};

exports.update = async function (data) {
    return await Connection.promise().query('update baidang set ?', data);
};

exports.readByTypePost = async function (id) {
    const sql = 'select TL.tentheloai, BD.id, BD.ngaydang, BV.tenbaiviet, BV.tomtat from theloaibaiviet TL, baidang BD, baiviet BV where BV.id=BD.idbaiviet and TL.id=BV.idtheloaibaiviet and BV.idtheloaibaiviet = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.readDetailBlogById = async function (id) {
    const sql = 'select BD.idbaiviet, BV.tomtat, ND.hoten, TL.tentheloai, BD.id, BD.ngaydang, BV.tenbaiviet, BV.noidung from nguoidung ND, theloaibaiviet TL, baidang BD, baiviet BV where ND.id=BV.idnguoigui and BV.id=BD.idbaiviet and TL.id=BV.idtheloaibaiviet and BD.id = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.searchByName = async function (name) {
    const sql = 'select TL.tentheloai, BD.id, BD.ngaydang, BV.tenbaiviet, BV.tomtat from theloaibaiviet TL, baidang BD, baiviet BV where BV.id=BD.idbaiviet and TL.id=BV.idtheloaibaiviet and BV.tenbaiviet like ' + Connection.escape('%' + name + '%');
    const result = await Connection.promise().query(sql);
    return result[0];
};

exports.readTableLikeBlog = async function (id) {
    const sql = 'select * from luotthich where idbv = ?';
    const result = await Connection.promise().query(sql, id);
    return result[0];
};

exports.insertTableLike = async function (id, number) {
    const sqlCheck = "SELECT COUNT(*) AS cnt FROM luotthich WHERE idbv = ? ";
    const resultCheck = await Connection.promise().query(sqlCheck, id);
    if (resultCheck[0].cnt === 0) {
        const sql = 'insert into luotthich(idbaiviet,soluong) values(?,?)';
        return await Connection.promise().query(sql, [id, number]);
    } else {
        const sql = 'update luotthich set soluong=? where idbv = ?';
        return await Connection.promise().query(sql, [number, id]);
    }
};

exports.readContentPostByIdBlog = async function (id) {
    const sql = "select * from baiviet BV, baidang BD where BV.id=BD.idbaiviet and BV.id = ?";
    const result = await Connection.promise().query(sql, id);
    return result[0];
};