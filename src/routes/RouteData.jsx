import React from 'react';
import RouteLazyLoad from './RouteLazyLoad.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import { Navigate } from 'react-router';
import ErrorLayout from '../components/error/ErrorLayout.jsx';

// 路由列表
const RouteData = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: RouteLazyLoad(React.lazy(() => import('../pages/dashboard/Dashboard.jsx')))
      },
      {
        path: 'system',
        children: [
          {
            path: 'department',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/department/Department.jsx')))
          },
          {
            path: 'job',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/job/Job.jsx')))
          },
          {
            path: 'user',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/user/User.jsx')))
          },
          {
            path: 'role',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/role/Role.jsx')))
          },
          {
            path: 'menu',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/menu/Menu.jsx')))
          },
          {
            path: 'api',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/api/API.jsx')))
          },
          {
            path: 'privilege',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/privilege/Privilege.jsx')))
          },
          {
            path: 'setting',
            element: RouteLazyLoad(React.lazy(() => import('../pages/system/setting/Setting.jsx')))
          }
        ]
      },
      {
        path: 'log',
        children: [
          {
            path: 'login',
            element: RouteLazyLoad(React.lazy(() => import('../pages/log/login/LoginLog.jsx')))
          },
          {
            path: 'operation',
            element: RouteLazyLoad(React.lazy(() => import('../pages/log/operation/OperationLog.jsx')))
          }
        ]
      },
      {
        path: 'me',
        element: RouteLazyLoad(React.lazy(() => import('../pages/me/Me.jsx')))
      },
      {
        path: 'help',
        element: RouteLazyLoad(React.lazy(() => import('../pages/help/Help.jsx')))
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
    element: <Navigate to="/error/404" />,
    notNeedAuth: true
  }
];

export default RouteData;
