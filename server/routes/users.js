const express = require('express');
const router = express.Router();
const mysqlDB = require('../db/mysql');

// 쿠폰 조회 api
router.post('/', async (req, res) => {
  // const { name, phone } = req.body;
  // mysqlDB.execute('SELECT * FROM coupon_total WHERE phone_number = ?', [phone], (err, results) => {
  //   if (err) console.log(err);
  //   console.log(results);
  // });
  // res.send(phone);
});

module.exports = router;
