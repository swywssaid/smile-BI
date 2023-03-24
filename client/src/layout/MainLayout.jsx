import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const pages = [
    { id: 1, name: 'issuance', path: '/' },
    { id: 2, name: 'history', path: '/history' },
  ];

  return (
    <LayoutWrapper>
      <NavWrapper>
        <Nav />
      </NavWrapper>
      <SidebarWrapper>
        <Sidebar pages={pages} />
      </SidebarWrapper>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  padding-top: 56px;
  height: 100%;
  padding-left: 240px;
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background-color: #ff9b00;
`;

const SidebarWrapper = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  height: 100%;
  width: 240px;
  background-color: #fdf5e6;
`;

const MainWrapper = styled.main`
  flex: 1;
  padding: 20px;
`;
