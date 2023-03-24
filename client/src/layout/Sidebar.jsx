import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Sidebar({ pages }) {
  return (
    <SidebarWrapper>
      {pages.map((page) => (
        <ListItem key={page.id}>
          <LinkStyled to={page.path}>{page.name}</LinkStyled>
        </ListItem>
      ))}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 35px;
  font-family: 'Pretendard-Light';
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
`;
