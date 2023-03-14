import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';

const Layout = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <header>
        <AppBar />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
