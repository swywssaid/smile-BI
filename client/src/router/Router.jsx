import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import HistoryPage from '../pages/HistoryPage';
import IssuancePage from '../pages/IssuancePage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<IssuancePage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
