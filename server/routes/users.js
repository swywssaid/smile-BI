const express = require('express');
const router = express.Router();
const mysqlDB = require('../db/mysql');

// MySQL 데이터베이스 연결
mysqlDB.connect();

// 쿠폰 조회 api
router.get('/', (req, res) => {
  res.send('user test');
});

module.exports = router;
