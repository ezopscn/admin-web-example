import React, { Suspense } from 'react';
import { Spin } from 'antd';

// 加载中图标
const RouteLoading = () => {
  return (
    <div className="admin-loading">
      <Spin size="large" />
    </div>
  );
};

// 惰性加载页面
const RouteLazyLoad = (Component) => {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Component />
    </Suspense>
  );
};

export default RouteLazyLoad;
