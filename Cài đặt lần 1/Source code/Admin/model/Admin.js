const connection = require('MySQL');
const AdminModel = new connection({table:'admin'});

exports.AdminModel = AdminModel;