import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ pages }) {
  return (
    <ul>
      {pages.map((page) => (
        <li key={page.id}>
          <Link to={page.path}>{page.name}</Link>
        </li>
      ))}
    </ul>
  );
}
