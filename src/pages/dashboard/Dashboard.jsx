import React from 'react';
import { Button } from 'antd';
import DashboardHeader from './DashboardHeader.jsx';

const Dashboard = () => {
  return (
    <>
      <DashboardHeader/>
      <div className="admin-main-content">
        内容主体
      </div>
    </>
  );
};

export default Dashboard;