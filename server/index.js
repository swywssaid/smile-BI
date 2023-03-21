const express = require('express');
const config = require('./config/index.js');
const coupons = require('./routes/coupons.js');
const users = require('./routes/users.js');

const app = express();

app.use('/api/coupon', coupons);
app.use('/api/user', users);

// JSON 형식의 요청 본문 파싱
app.use(express.json());

// 폼 데이터 형식의 요청 본문 파싱
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
