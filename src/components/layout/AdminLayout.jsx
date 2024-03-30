import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { App, Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Logo, LogoWithWhiteTitle } from '../../common/Image.jsx';
import { FooterText } from '../../common/Text.jsx';
import { GETCurrentRoleMenuListRequest, LogoutRequest } from '../../utils/RequestAPI.jsx';
import { jwtDecode } from 'jwt-decode';
import { LayoutStates, UserStates } from '../../stores/Stores.jsx';
import { useSnapshot } from 'valtio';
import { GenerateMenuTree } from '../../utils/MenuTree.jsx';

const { Header, Content, Footer, Sider } = Layout;

// 后台 Layout
const AdminLayoutPage = () => {
  const { message } = App.useApp();
  // 菜单宽度
  const menuWidth = 220;
  const menuCollapsedWidth = 60;
  // 菜单跳转
  const navigate = useNavigate();
  // 用于获取请求连接
  const { pathname } = useLocation();
  // 展开收起状态
  const [collapsed, setCollapsed] = useState(false);
  // 选中的菜单
  const { MenuSiderCollapsed, MenuOpenKeys, MenuSelectKeys } = useSnapshot(LayoutStates);

  // 解析 Token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      UserStates.CurrentUserInfo = jwtDecode(token);
    }
  }, []);
  const { CurrentUserInfo } = useSnapshot(UserStates);

  // 查询菜单列表
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await GETCurrentRoleMenuListRequest();
        if (res.code === 200) {
          setMenuList(res.data?.list);
        } else if (res.code === 1000) {
          // Token 失效，退出登录
          localStorage.clear();
          navigate('/login');
          message.warning('用户登录信息失效，请重新登录');
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);
  const menuTree = GenerateMenuTree(0, menuList);

  const findKeyList = (key, menus) => {
    const result = [];
    let fmenu = {};
    // 先找到对应的菜单
    menus.forEach((menu) => {
      if (menu.key === key) {
        fmenu = menu;
        result.push(key);
      }
    });
    // 通过找到的菜单，查询它的所有上级菜单
    const findMenu = (menu) => {
      if (menu.parent_id !== 0) {
        menus.forEach((item) => {
          if (item.id === menu.parent_id) {
            result.push(item.key);
            findMenu(item);
          }
        });
      }
    };
    findMenu(fmenu);
    return result;
  };

  useEffect(() => {
    if (menuList.length > 0) {
      // 修改默认打开和选中菜单
      let keys = findKeyList(pathname, menuList);
      LayoutStates.MenuSelectKeys = keys;

      // 解决收起菜单会弹出子菜单的问题
      if (MenuSiderCollapsed) {
        LayoutStates.MenuOpenKeys = [];
      } else {
        LayoutStates.MenuOpenKeys = keys;
      }
    }
  }, [pathname, menuList]);

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
      disabled: true,
    },
    {
      type: 'divider',
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
      ),
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" onClick={logoutHandler}>
          注销登录
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <div className="admin-layout-logo" style={{ width: collapsed ? menuCollapsedWidth + 'px' : menuWidth + 'px' }}>
        <img src={collapsed ? Logo : LogoWithWhiteTitle} alt="" />
      </div>
      <Sider className="admin-sider" width={menuWidth} collapsedWidth={menuCollapsedWidth} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          className="admin-sider-menu"
          theme="dark"
          defaultSelectedKeys="['/dashboard']"
          openKeys={MenuOpenKeys}
          selectedKeys={MenuSelectKeys}
          mode="inline"
          items={menuTree}
          onOpenChange={(key) => {
            // 解决 404 等页码第一次点击折叠菜单不展开和收起菜单栏不选中问题
            // LayoutStates.MenuOpenKeys = [key[key.length - 1]];
            LayoutStates.MenuOpenKeys = key;
          }}
          // 菜单点击事件，能够返回对应的 Key
          // 文档中提示可获取到 item, key, keyPath, domEvent
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-left">
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
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

const AdminLayout = () => (
  <App>
    <AdminLayoutPage />
  </App>
);

export default AdminLayout;
