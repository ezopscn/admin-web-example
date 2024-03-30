import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '角色管理 / ROLE MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对角色进行添加，修改，删除，授权管理等，但需要注意，如果该角色下面还有用户，则该角色无法删除。</li>
      <li>一个用户只能有一个角色，如果一个用户的权限很复杂，我们推荐为其单独创建一个角色，而不是授权多个角色。</li>
      <li>
        可以把角色当成用户组来理解，所以系统不再提供用户组管理功能。同时，系统预留了两个默认角色，该角色无法修改，删除：
        <ul>
          <li>
            <b>ADMINISTRATOR（超级管理员）</b>：系统最高权限的角色，后续即使创建了和它相同权限的角色，依然无法替代它。
          </li>
          <li>
            <b>GUEST（访客）</b>：系统最低权限角色，当用户没有任何角色的时候，默认分配该角色。
          </li>
        </ul>
      </li>
    </ul>
  );
};

const RolePage = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>Role</div>
    </>
  );
};

const Role = () => (
  <App>
    <RolePage />
  </App>
);

export default Role;
