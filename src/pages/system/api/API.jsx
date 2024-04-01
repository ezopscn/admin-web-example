import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '接口管理 / API MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对接口进行添加，修改，删除等，但需要注意，如果该接口下面还有角色绑定，则该接口无法删除。</li>
      <li>系统本身是一个基于 RBAC
        的权限管理系统，除了系统预留的角色，其它每一个角色都需要对接口分配相应的权限才能请求对应的数据。
      </li>
      <li>后端的接口分为三类：开放接口，需要登录的开放接口和需要登录然后鉴权的接口。所以为了系统安全稳定运行，开发人员在进行接口设计的时候一定要考虑好权限设计。</li>
    </ul>
  );
};

const APIPage = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>API</div>
    </>
  );
};

const API = () => (
  <App>
    <APIPage />
  </App>
);

export default API;
