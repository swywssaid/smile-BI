import React from 'react';

export default function Form({ type, value, handleChange, placeholder }) {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
}
