import React, { useEffect, useState } from 'react';
import {
  FileProtectOutlined,
  HomeOutlined,
  InsuranceOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, message } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { Logo, LogoWithWhiteTitle } from '../../common/Image.jsx';
import { FooterText } from '../../common/Text.jsx';
import { LogoutRequest } from '../../utils/RequestAPI.jsx';
import { jwtDecode } from 'jwt-decode';
import { UserStates } from '../../stores/Stores.jsx';
import { useSnapshot } from 'valtio';

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
  getMenuItem('系统设置', '/system', <SettingOutlined />, [
    getMenuItem('部门管理', '/system/department'),
    getMenuItem('用户管理', '/system/user'),
    getMenuItem('角色管理', '/system/role'),
    getMenuItem('菜单管理', '/system/menu'),
    getMenuItem('接口管理', '/system/api'),
    getMenuItem('授权管理', '/system/privilege'),
    getMenuItem('服务配置', '/system/setting')
  ]),
  getMenuItem('日志审计', '/log',
    <InsuranceOutlined />, [getMenuItem('登录日志', '/log/login'), getMenuItem('操作日志', '/log/operation')]),
  getMenuItem('个人中心', '/me', <UserOutlined />),
  getMenuItem('获取帮助', '/help', <FileProtectOutlined />)
];

// 后台 Layout
const AdminLayout = () => {
  // 菜单跳转
  const navigate = useNavigate();

  // 展开收起状态
  const [collapsed, setCollapsed] = useState(false);

  // 菜单宽度
  const menuWidth = 220;
  const menuCollapsedWidth = 60;

  // 解析 Token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      UserStates.CurrentUserInfo = jwtDecode(token);
    }
  }, []);

  // 当前用户信息
  const { CurrentUserInfo } = useSnapshot(UserStates);

  // 用户注销方法
  const logoutHandler = async () => {
    try {
      const res = await LogoutRequest();
      if (res.code === 200) {
        localStorage.clear();
        navigate('/login');
        message.success('注销成功');
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
      message.error('服务器异常，请联系管理员');
    }
  };

  // 下拉菜单
  const dropdownItems = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="">
          {CurrentUserInfo?.CNName}（{CurrentUserInfo?.ENName}）
        </a>
      ),
      disabled: true
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate('/me');
          }}>
          个人中心
        </a>
      )
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" onClick={logoutHandler}>
          注销登录
        </a>
      )
    }
  ];

  return (
    <Layout>
      <div className="admin-layout-logo" style={{ width: collapsed ? menuCollapsedWidth + 'px' : menuWidth + 'px' }}>
        <img src={collapsed ? Logo : LogoWithWhiteTitle} alt="" />
      </div>
      <Sider className="admin-sider" width={menuWidth} collapsedWidth={menuCollapsedWidth} collapsible
             collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          className="admin-sider-menu"
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-left">
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className="admin-header-right">
            <div className="admin-header-dropdown">
              <Dropdown menu={{ items: dropdownItems }}>
                <Avatar size={30} src={CurrentUserInfo?.Avatar} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
        <Footer className="admin-footer">
          <FooterText />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
