import React from 'react';
import { Outlet } from 'react-router';

const ErrorLayout = () => {
  return (
    <div>
      <div>ERROR</div>
      <div><Outlet /></div>
    </div>
  );
};

export default ErrorLayout;