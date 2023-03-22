const express = require('express');
const router = express.Router();
const mysqlDB = require('../db/mysql');
const voucherCodes = require('voucher-code-generator');

async function getUniqueCoupon() {
  let isDuplicated = true;
  let couponCode;
  while (isDuplicated) {
    [couponCode] = await voucherCodes.generate({
      length: 12,
      count: 1,
      charset: '0123456789',
      pattern: '####-####-####',
    });

    try {
      const { _rows } = await mysqlDB.execute(
        'SELECT * FROM coupon_total WHERE coupon_code = ?',

        [couponCode]
      );

      if (_rows.length === 0) {
        isDuplicated = false;
      } else {
        console.log('코드 중복');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return couponCode;
}

// 쿠폰 발급 api
router.post('/', async (req, res) => {
  const results = await mysqlDB.execute('SELECT * FROM coupon_total');
  console.log(results);
  try {
    const { name, phone } = req.body;
    let couponCode;

    // 데이터베이스에서 해당 번호가 있는지 조회
    try {
      const { _rows } = await mysqlDB.execute(
        'SELECT * FROM coupon_total WHERE phone_number = ?',

        [phone]
      );

      if (_rows.length === 0) {
        couponCode = await getUniqueCoupon();
      } else {
        console.log('이미 발급받은 핸드폰 번호');
      }
    } catch (err) {
      console.log(err);
    }

    // 데이터베이스에 저장
    try {
      await mysqlDB.execute(
        'INSERT INTO coupon_total (phone_number, name, coupon_code, created_at) VALUES (?, ?, ?, default)',

        [phone, name, couponCode]
      );

      res
        .status(200)

        .json({ message: `쿠폰 번호 저장: 쿠폰 번호는 ${couponCode}입니다.` });
    } catch (err) {
      res.status(500).json({ message: '쿠폰 번호 저장: 서버 오류', err });

      console.log(err);
    }
  } catch (err) {
    res.status(500).json({ message: '11서버 오류', err });
  }
});

module.exports = router;
