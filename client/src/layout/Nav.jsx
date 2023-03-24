import React from 'react';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavWrapper>
      <HeaderWrapper>Smile BI</HeaderWrapper>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const HeaderWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-left: 50px;
`;
