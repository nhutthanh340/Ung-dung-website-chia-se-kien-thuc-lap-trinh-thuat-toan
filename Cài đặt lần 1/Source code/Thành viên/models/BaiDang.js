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