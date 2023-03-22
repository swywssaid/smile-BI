import React, { useState } from 'react';
import ValidForm from '../components/HistoryPage/ValidForm';

export default function IssuancePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  // 시작버튼 클릭 시 서버에 유저 정보 전달
  const submitUserInfo = async (url, data) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        // setWarningMessage(err, '이미 발급 받은 회원 정보입니다');
      });
  };

  const nameProps = {
    type: 'text',
    value: name,
    setValue: setName,
    placeholder: '이름을 입력하세요!',
    regex: /^[a-zㄱ-ㅎ가-힣]{1,}$/,
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    setValue: setPhone,
    placeholder: '휴대폰 번호를 입력하세요!',
    regex: /^[0-9-]{1,}$/,
  };

  const activateButton = (name, phone) => {
    const nameRegex = /[a-z가-힣]{2,10}/;
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    return !(nameRegex.test(name) && phoneRegex.test(phone));
  };

  return (
    <div>
      <ValidForm {...nameProps} />
      <ValidForm {...phoneProps} />
      <button disabled={activateButton(name, phone)} onClick={() => submitUserInfo('/api/coupon', { name, phone })}>
        발급받기
      </button>
      <div>경고메시지: {warningMessage}</div>
      <div>쿠폰번호: {couponCode}</div>
    </div>
  );
}
