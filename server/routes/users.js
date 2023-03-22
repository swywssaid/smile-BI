const express = require('express');
const router = express.Router();
const mysqlDB = require('../db/mysql');

// 쿠폰 조회 api
router.get('/', async (req, res) => {
  try {
    await mysqlDB.execute('SELECT * FROM coupon_total', (err, results) => {
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
