import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '授权管理 / PRIVILEGE MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对授权进行添加，修改，删除，授权管理等。</li>
    </ul>
  );
};

const PrivilegePage = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>Privilege</div>
    </>
  );
};

const Privilege = () => (
  <App>
    <PrivilegePage />
  </App>
);

export default Privilege;
