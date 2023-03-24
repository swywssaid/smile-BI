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
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 30px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
`;
