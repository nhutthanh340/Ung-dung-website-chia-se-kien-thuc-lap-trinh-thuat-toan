const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HostDB,
    user: process.env.UserNameDB,
    password: process.env.PasswordDB,
    database: process.env.DB
});

exports.connection = connection;