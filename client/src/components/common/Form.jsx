import React from 'react';
import styled from 'styled-components';

export default function Form({ type, value, handleChange, placeholder, page }) {
  return (
    <FormWrapper page={page}>
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={handleChange} page={page} />
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  padding-bottom: ${(props) => (props.page === 'HistoryPage' ? '0px' : '40px')};
`;

const StyledInput = styled.input`
  width: ${(props) => (props.page === 'HistoryPage' ? '200px' : '500px')};
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
