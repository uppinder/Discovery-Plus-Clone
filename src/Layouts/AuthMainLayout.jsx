import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthMainLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthMainLayout;
