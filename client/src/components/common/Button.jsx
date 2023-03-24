import React from 'react';

export default function Button({ text, handleClick, disabled }) {
  return (
    <div>
      <button disabled={disabled} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
}
