const express = require('express');
const router = express.Router();
const { queryPhone, insertUserInfo } = require('../db/mysql');

// 쿠폰 발급 api
router.post('/', async (req, res) => {
  const { name, phone } = req.body;
  const couponCode = await queryPhone(res, phone);
  if (!couponCode) return;
  await insertUserInfo(res, phone, name, couponCode);
});

module.exports = router;
