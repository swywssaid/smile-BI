const express = require('express');
const app = express();
const port = 5000;

// 쿠폰 발급 api
app.post('/api/coupon', (req, res) => {
  res.send(req.phone);
});

// 쿠폰 조회 api, 핸드폰 번호로
app.get('/api/coupon', (req, res) => {
  res.send(req.phone);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
