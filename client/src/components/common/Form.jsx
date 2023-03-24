import React from 'react';
import styled from 'styled-components';

export default function Form({ type, value, handleChange, placeholder }) {
  return (
    <FormWrapper>
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  padding-bottom: 40px;
`;
const StyledInput = styled.input`
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard-Light';

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;
