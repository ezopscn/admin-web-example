import React from 'react';
import DashboardHeader from './DashboardHeader.jsx';
import { App } from 'antd';

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="admin-main-content">内容主体</div>
    </>
  );
};

const Dashboard = () => (
  <App>
    <DashboardPage />
  </App>
);

export default Dashboard;
