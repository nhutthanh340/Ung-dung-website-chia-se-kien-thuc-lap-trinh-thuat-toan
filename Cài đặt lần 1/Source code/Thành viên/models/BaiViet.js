const Connection = require('../models/MySQL').connection;
const User = require('../models/NguoiDung');

exports.InsertBaiViet = async function (tenbaiviet, idtheloaibaiviet, noidung, idnguoigui) {
    const sqlInsert = "INSERT INTO baiviet(tenbaiviet, idtheloaibaiviet, noidung, idnguoigui) VALUES (?,?,?,?)";
    const result = await Connection.promise().query(sqlInsert, [tenbaiviet, idtheloaibaiviet, noidung, idnguoigui]);
    return result;
};

exports.readAllBaiViet = async function (email) {
    const getID = await User.readOneUser(email);
    const id = JSON.parse(JSON.stringify(getID[0]));

    const sql = 'select * from baiviet BV, theloaibaiviet TL where BV.idnguoigui = ? and BV.idtheloaibaiviet = TL.id';
    const result = await Connection.promise().query(sql, id.id);
    return result[0];
};