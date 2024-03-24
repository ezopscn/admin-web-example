import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';

// 页面标题
const Title = '登录日志 / LOGIN LOG';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>普通用户可以查看和检索自己的登录日志，管理员用户可以查看和检索所有用户的登录日志。</li>
    </ul>
  );
};

const LoginLog = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>LoginLog</div>
    </>
  );
};

export default LoginLog;