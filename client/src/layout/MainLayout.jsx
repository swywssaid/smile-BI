import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const pages = [
    { id: 1, name: '쿠폰 발급 페이지', path: '/' },
    { id: 2, name: '이력 조회 페이지', path: '/history' },
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
  padding-top: 60px;
  height: 100%;
`;

const NavWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: rgba(255, 103, 0, 0.8);
  z-index: 1;
`;

const SidebarWrapper = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 60px;
  height: calc(100% - 64px);
  width: 200px;
  background-color: #f5f5f5;
  z-index: 1;
`;

const MainWrapper = styled.main`
  display: flex;
  width: calc(100% - 200px);
  height: calc(100% - 64px);
  flex: 1;
  padding-left: 200px;
`;
