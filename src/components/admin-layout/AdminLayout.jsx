import React, { useState } from 'react';
import {
  FileProtectOutlined,
  HomeOutlined,
  InsuranceOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { FooterText, Logo, LogoWithWhiteTitle } from '../../common/Resource.jsx';
import { Outlet } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

// 合成菜单
function getMenuItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

// 菜单数据
const menuItems = [
  getMenuItem('工作空间', '/dashboard', <HomeOutlined />),
  getMenuItem('用户中心', '/users', <TeamOutlined />, [
    getMenuItem('用户管理', '/users/user'),
    getMenuItem('角色管理', '/users/role'),
    getMenuItem('部门管理', '/users/department')
  ]),
  getMenuItem('系统设置', '/system', <SettingOutlined />, [
    getMenuItem('菜单管理', '/system/menu'),
    getMenuItem('接口管理', '/system/api'),
    getMenuItem('服务配置', '/system/setting')
  ]),
  getMenuItem('日志审计', '/log', <InsuranceOutlined />, [
    getMenuItem('登录日志', '/log/login'),
    getMenuItem('操作日志', '/log/operation')
  ]),
  getMenuItem('个人中心', '/me', <UserOutlined />),
  getMenuItem('获取帮助', '/help', <FileProtectOutlined />)
];

// 后台 Layout
const AdminLayout = () => {
  // 展开收起状态
  const [collapsed, setCollapsed] = useState(false);

  // 菜单宽度
  const menuWidth = 220;
  const menuCollapsedWidth = 60;

  return (
    <Layout>
      <div className='admin-layout-logo'
           style={{ width: collapsed ? menuCollapsedWidth + 'px' : menuWidth + 'px' }}>
        <img src={collapsed ? Logo : LogoWithWhiteTitle} alt='' />
      </div>
      <Sider className='admin-sider'
             width={menuWidth}
             collapsedWidth={menuCollapsedWidth}
             collapsible
             collapsed={collapsed}
             onCollapse={(value) => setCollapsed(value)}>
        <Menu className='admin-sider-menu'
              theme='dark'
              defaultSelectedKeys={['1']}
              mode='inline'
              items={menuItems} />
      </Sider>
      <Layout>
        <Header className='admin-header'></Header>
        <Content className='admin-content'>
          <Outlet />
        </Content>
        <Footer className='admin-footer'>
          <FooterText />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;