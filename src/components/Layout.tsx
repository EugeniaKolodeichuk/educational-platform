import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import Loader from './Loader';

const Layout = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <header>
        <AppBar />
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
