import React, { useState } from 'react';
import Form from '../components/common/Form';

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
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCouponCode(data.data);
          setWarningMessage('');
        } else {
          setCouponCode('');
          setWarningMessage('이미 발급 받은 회원 정보입니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 유효성 체크
  const checkValid = (regex, setValue) => (event) => {
    const input = event.target.value;

    if (regex.test(input)) {
      setValue(input);
    }

    if (input === '') {
      setValue('');
    }
  };

  const nameRegex = /^[a-zㄱ-ㅎ가-힣]{1,}$/;
  const phoneRegex = /^[0-9]{1,}$/;

  const nameProps = {
    type: 'text',
    value: name,
    handleChange: checkValid(nameRegex, setName),
    placeholder: '이름을 입력하세요!',
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    handleChange: checkValid(phoneRegex, setPhone),
    placeholder: '휴대폰 번호를 입력하세요!',
  };

  const activateButton = (name, phone) => {
    const nameRegex = /[a-z가-힣]{2,10}/;
    const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    return !(nameRegex.test(name) && phoneRegex.test(phone));
  };

  return (
    <div>
      <Form {...nameProps} />
      <Form {...phoneProps} />
      <button
        disabled={activateButton(name, phone)}
        onClick={() => submitUserInfo('/api/coupon/issuance', { name, phone })}
      >
        발급받기
      </button>
      <div>경고메시지: {warningMessage}</div>
      <div>쿠폰번호: {couponCode}</div>
    </div>
  );
}
