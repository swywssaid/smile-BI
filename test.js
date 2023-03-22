async function getUniqueCode() {
  let isDuplicated = true;
  let Code;

  // 유니크한 코드 생성될 때까지 반복
  while (isDuplicated) {
    // 코드 생성
    Code = await generateCode();

    // db에서 코드 조회
    await mySQL.execute('SELECT * FROM code WHERE code = ?', [Code], (err, results) => {
      if (err) console.log(err);

      // 코드 없으면 루프 탈출
      if (results.length === 0) {
        isDuplicated = false;
      } else {
        console.log('코드 중복');
      }
    });
  }

  return Code;
}

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

    console.log(couponCode);

    async function checkCouponDuplicated(isDuplicated) {
      await mysqlDB.execute('SELECT * FROM coupon_total WHERE coupon_code = ?', [couponCode], (err, results) => {
        if (err) console.log(err);
        if (results.length === 0) {
          isDuplicated = false;
          console.log(results);
        } else {
          console.log('쿠폰 번호 조회: 중복된 코드가 존재합니다');
        }
      });
      return isDuplicated;
    }

    isDuplicated = await checkCouponDuplicated(isDuplicated);
  }

  return couponCode;
}
