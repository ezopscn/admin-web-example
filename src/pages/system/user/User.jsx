import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '用户管理 / USER MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对用户进行添加，修改，禁用，启用，批量导入等。</li>
      <li>注意：为了避免业务数据关联关系出现问题，用户在离职等特殊情况需要进行账户删除操作的，系统只提供的了用户禁用功能，禁用的用户将不再允许登录系统。</li>
      <li>系统不再预留员工工号字段，系统建议企业管理者直接使用用户的工号做为用户的用户名字段。</li>
      <li>对于需要进行手机号保密的用户，除了系统预留的超级管理员角色以外，其他用户，包括普通管理员都是无权查看的。</li>
    </ul>
  );
};

const UserPage = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>User</div>
    </>
  );
};

const User = () => (
  <App>
    <UserPage />
  </App>
);

export default User;
