const express = require('express');
const config = require('./config/index.js');
const issuance = require('./routes/issuance.js');
const users = require('./routes/users.js');

const app = express();
// JSON 형식의 요청 본문 파싱
app.use(express.json());

// 폼 데이터 형식의 요청 본문 파싱
app.use(express.urlencoded({ extended: true }));

app.use('/api/coupon', issuance);
app.use('/api/user', users);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
