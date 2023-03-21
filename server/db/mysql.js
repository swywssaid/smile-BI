const config = require('../config/index.js');
const mysql = require('mysql2');

// MySQL 데이터베이스 연결 설정
const mysqlDB = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

module.exports = mysqlDB;
