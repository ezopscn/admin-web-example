import React from 'react';
import RouteLazyLoad from './RouteLazyLoad.jsx';
import AdminLayout from '../components/admin-layout/AdminLayout.jsx';
import { Navigate, useRoutes } from 'react-router';

// 路由列表
const RouteData = [
  {
    path: '/',
    element: <Navigate to='/dashboard' />
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: RouteLazyLoad(React.lazy(() => import('../pages/dashboard/Dashboard.jsx')))
      }]
  }
];

// 生成路由规则
const RouteRules = () => {
  return useRoutes(RouteData);
};

export default RouteRules;