const config = require('../config/index.js');
const mysql = require('mysql2/promise');
const voucherCodes = require('voucher-code-generator');

// MySQL 데이터베이스 pool 설정
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

// 데이터베이스에서 해당 핸드폰 번호가 있는지 조회
const queryPhone = async (res, phone) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      /* Step 3. */
      const [rows] = await connection.execute(
        'SELECT * FROM coupon_total WHERE phone_number = ?',
        [phone]
      );
      connection.release();
      if (rows.length === 0) {
        return await getUniqueCoupon(res);
      }

      if (rows.length > 0) {
        res
          .status(400)
          .json({ success: false, message: '이미 발급받은 핸드폰 번호입니다' });
        return false;
      }
    } catch (err) {
      connection.release();
      console.log(`DB queryPhone err: ${err} `);
      return false;
    }
  } catch (err) {
    console.log(`DB queryPhone err: ${err} `);
    return false;
  }
};

// 유니크 쿠폰 번호 생성 함수
const getUniqueCoupon = async () => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
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
        const [rows] = await connection.execute(
          'SELECT * FROM coupon_total WHERE coupon_code = ?',

          [couponCode]
        );
        connection.release();

        if (rows.length === 0) isDuplicated = false;
      } catch (err) {
        connection.release();
        console.log(`DB getUniqueCoupon err: ${err} `);
        return false;
      }
    }

    return couponCode;
  } catch (err) {
    console.log(`DB getUniqueCoupon err: ${err} `);
    return false;
  }
};

// 데이터베이스에 저장
const insertUserInfo = async (res, phone, name, couponCode) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      await connection.execute(
        'INSERT INTO coupon_total (phone_number, name, coupon_code, created_at) VALUES (?, ?, ?, default)',
        [phone, name, couponCode]
      );
      connection.release();

      return res.status(200).json({ success: true, data: couponCode });
    } catch (err) {
      connection.release();
      console.log(`DB insertUserInfo err: ${err} `);
      return res.status(500).send({ message: `DB insertUserInfo err: ${err}` });
    }
  } catch (err) {
    return res.status(500).send({ message: `DB insertUserInfo err: ${err}` });
  }
};

module.exports = { queryPhone: queryPhone, insertUserInfo: insertUserInfo };
