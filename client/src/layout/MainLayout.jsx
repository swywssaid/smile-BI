import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const pages = [
    { id: 1, name: 'issuance', path: '/' },
    { id: 2, name: 'history', path: '/history' },
  ];

  return (
    <div>
      <Nav />
      <Sidebar pages={pages} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
