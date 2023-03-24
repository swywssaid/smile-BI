import React from 'react';
import styled from 'styled-components';

export default function Button({ type, text, handleClick, disabled }) {
  return (
    <StyledButton type={type} disabled={disabled} onClick={handleClick}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => (props.type === 'modal' ? '200px' : '500px')};
  background: ${(props) => (props.disabled ? 'white' : 'black')};
  color: ${(props) => (props.disabled ? 'black' : 'white')};
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 140%;
  font-family: 'Pretendard-Light';
`;
