import React, { useState } from 'react';
import Form from '../components/common/Form';

export default function HistoryPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const nameProps = {
    type: 'text',
    value: name,
    handleChange: handleChangeName,
    placeholder: '이름을 입력하세요!',
  };

  const phoneProps = {
    type: 'text',
    value: phone,
    handleChange: handleChangePhone,
    placeholder: '휴대폰 번호를 입력하세요!',
  };

  return (
    <div>
      <Form {...nameProps} />
      <Form {...phoneProps} />
    </div>
  );
}
