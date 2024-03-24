import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';

// 页面标题
const Title = '服务配置 / SERVER SETTING';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>该页面是一个权限很高的页面，用户可以针对系统的一些基础配置进行变更，所以管理员在进行接口，菜单授权的时候一定要保守起见。</li>
      <li>该配置都是变更后立即生效的，所以在操作的时候一定要谨慎，并做好截图备份，便于出问题恢复。</li>
    </ul>
  );
};

const Setting = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>Setting</div>
    </>
  );
};

export default Setting;