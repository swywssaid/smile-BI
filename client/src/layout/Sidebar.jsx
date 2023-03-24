import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Sidebar({ pages }) {
  return (
    <ul>
      {pages.map((page) => (
        <List key={page.id}>
          <Link to={page.path}>{page.name}</Link>
        </List>
      ))}
    </ul>
  );
}

const List = styled.li`
  padding: 30px;
`;
