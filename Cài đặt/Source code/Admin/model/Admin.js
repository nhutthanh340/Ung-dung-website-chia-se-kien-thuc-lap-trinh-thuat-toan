const connection = require('MySQL');

const AdminModel = new connection({
    tableName: "admin"
});

exports.AdminModel = AdminModel;


