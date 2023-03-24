import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavWrapper>
      <HeaderWrapper>
        <LinkStyled to={'/'}>Smile BI</LinkStyled>
      </HeaderWrapper>
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
  padding-left: 58px;
  font-family: 'Pretendard-Regular';
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
`;
