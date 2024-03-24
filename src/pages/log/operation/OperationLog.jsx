import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';

// 页面标题
const Title = '操作日志 / OPERATION LOG';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>普通用户可以查看和检索自己的操作日志，管理员用户可以查看和检索所有用户的操作日志。</li>
    </ul>
  );
};

const OperationLog = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>OperationLog</div>
    </>
  );
};

export default OperationLog;