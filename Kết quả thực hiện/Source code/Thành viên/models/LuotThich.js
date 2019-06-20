const Connection = require('../models/MySQL').connection;

exports.readAll = async function () {
    const result = await Connection.promise().query('select count(*) from luotthich');
    return result[0][0]['count(*)'];
};

exports.read = async function (idnguoidung, idbaidang) {
    try {
        const result = await Connection.promise().query('select * from luotthich where idnguoidung=? and idbaidang=?', [idnguoidung, idbaidang]);
        return result[0][0];
    } catch (e) {
        return 0;
    }
};

exports.delete = async function (idnguoidung, idbaidang) {
    return await Connection.promise().query('delete from luotthich where idnguoidung=? and idbaidang=?', [idnguoidung, idbaidang]);
};

exports.insert = async function (data) {
    return await Connection.promise().query('insert into luotthich set ?', data);
};
