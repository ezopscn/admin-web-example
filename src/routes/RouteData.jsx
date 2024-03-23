import React from 'react';
import RouteLazyLoad from './RouteLazyLoad.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import { Navigate, useRoutes } from 'react-router';
import ErrorLayout from '../components/error/ErrorLayout.jsx';

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
      }
    ]
  },
  // 无需登录
  {
    path: 'login',
    element: RouteLazyLoad(React.lazy(() => import('../pages/login/Login.jsx'))),
    notNeedAuth: true
  },
  {
    path: 'error',
    element: <ErrorLayout />,
    children: [
      {
        path: '403',
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/403.jsx'))),
        notNeedAuth: true // 无需登录标识
      },
      {
        path: '404',
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/404.jsx'))),
        notNeedAuth: true
      },
      {
        path: '500',
        element: RouteLazyLoad(React.lazy(() => import('../pages/error/500.jsx'))),
        notNeedAuth: true
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/error/404' />,
    notNeedAuth: true
  }
];

// 生成路由规则
const RouteRules = () => {
  return useRoutes(RouteData);
};

export default RouteRules;