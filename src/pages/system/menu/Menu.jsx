import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';

// 页面标题
const Title = '菜单管理 / MENU MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对菜单进行添加，修改，删除等，但需要注意，如果该菜单下面还有角色绑定，则该菜单无法删除。</li>
      <li>系统预留的超级管理员角色无需授权菜单权限，默认自动拥有所有菜单的权限。同样的，访客角色也无法修改其菜单授权，默认为最小菜单授权。</li>
      <li>如果用户所在的角色对该菜单没有权限，那么即使他知道菜单的连接地址，系统也会返回 403 FORBIDDEN。</li>
      <li>菜单图标来源于 <a href='https://ant-design.antgroup.com/components/icon-cn' target='_blank'><b>ANT DESIGN
        ICON</b></a> 名称，只有名称正确了，页面上才能正常的显示。子菜单不推荐配置图标，会影响整体视觉效果。
      </li>
    </ul>
  );
};

const Menu = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>Menu</div>
    </>
  );
};

export default Menu;