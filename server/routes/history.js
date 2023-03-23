const express = require('express');
const router = express.Router();
const { queryHistory } = require('../db/mysql');

// 쿠폰 조회 api
router.get('/', async (req, res) => {
  try {
    const { page, pageSize, name, phone } = req.query;
    console.log(req.query);
    await queryHistory(res, page, pageSize, name, phone);
  } catch (err) {
    res.status(500).send({ message: `users.js 쿠폰 조회 api err: ${err}` });
  }
});

module.exports = router;
