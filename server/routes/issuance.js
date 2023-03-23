const express = require('express');
const router = express.Router();
const mysqlDB = require('../db/mysql');
const voucherCodes = require('voucher-code-generator');

async function getUniqueCoupon(res) {
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

      if (_rows.length === 0) isDuplicated = false;
    } catch (err) {
      res.status(500).json({ message: `쿠폰 번호 조회 서버 오류: ${err}` });
    }
  }

  return couponCode;
}

// 쿠폰 발급 api
router.post('/', async (req, res) => {
  const { name, phone } = req.body;
  let couponCode;

  // 데이터베이스에서 해당 번호가 있는지 조회
  try {
    const { _rows } = await mysqlDB.execute(
      'SELECT * FROM coupon_total WHERE phone_number = ?',
      [phone]
    );

    if (_rows.length === 0) {
      couponCode = await getUniqueCoupon(res);
    } else {
      return res
        .status(400)
        .json({ message: '이미 발급받은 핸드폰 번호입니다' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: `쿠폰 번호 조회 서버 오류: ${err}` });
  }

  // 데이터베이스에 저장
  try {
    await mysqlDB.execute(
      'INSERT INTO coupon_total (phone_number, name, coupon_code, created_at) VALUES (?, ?, ?, default)',
      [phone, name, couponCode]
    );

    return res.status(200).json({ data: couponCode });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `쿠폰 번호 저장 서버 오류: ${err}` });
  }
});

module.exports = router;
