import React from 'react';

export default function ValidForm({ type, value, setValue, placeholder, regex }) {
  // 유효성 체크
  const checkValid = (event) => {
    const input = event.target.value;

    if (regex.test(input)) {
      setValue(input);
    }

    if (input === '') {
      setValue('');
    }
  };

  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} onChange={checkValid} />
    </div>
  );
}
