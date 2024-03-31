import React, { useEffect, useState } from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App, Button, Col, Row } from 'antd';
import { FolderOpenOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const { Search } = Input;
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

// 页面标题
const Title = '菜单管理 / MENU MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对菜单进行添加，修改，删除等，但需要注意，如果该菜单下面还有角色绑定，则该菜单无法删除。</li>
      <li>系统预留的超级管理员角色无需授权菜单权限，默认自动拥有所有菜单的权限。同样的，访客角色也无法修改其菜单授权，默认为最小菜单授权。</li>
      <li>如果用户所在的角色对该菜单没有权限，那么即使他知道菜单的连接地址，系统也会返回 403 FORBIDDEN。</li>
      <li>
        菜单图标来源于{' '}
        <a href="https://ant-design.antgroup.com/components/icon-cn" target="_blank">
          <b>ANT DESIGN ICON</b>
        </a>{' '}
        名称，只有名称正确了，页面上才能正常的显示。子菜单不推荐配置图标，会影响整体视觉效果。
      </li>
    </ul>
  );
};

const MenuPage = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const treeData = [
    {
      title: '工作空间',
      key: '/dashboard',
      isLeaf: true,
    },
    {
      title: '系统配置',
      key: '/system',
      children: [
        {
          title: '部门管理',
          key: '/system/department',
          isLeaf: true,
        },
        {
          title: '用户管理',
          key: '/system/user',
          isLeaf: true,
        },
        {
          title: '角色管理',
          key: '/system/role',
          isLeaf: true,
        },
        {
          title: '菜单管理',
          key: '/system/menu',
          isLeaf: true,
        },
        {
          title: '接口管理',
          key: '/system/api',
          isLeaf: true,
        },
        {
          title: '授权管理',
          key: '/system/privilege',
          isLeaf: true,
        },
        {
          title: '服务配置',
          key: '/system/setting',
          isLeaf: true,
        },
      ],
    },
    {
      title: '日志审计',
      key: '/log',
      children: [
        {
          title: '登录日志',
          key: '/log/login',
          isLeaf: true,
        },
        {
          title: '操作日志',
          key: '/log/operation',
          isLeaf: true,
        },
      ],
    },
    {
      title: '个人中心',
      key: '/me',
      isLeaf: true,
    },
    {
      title: '获取帮助',
      key: '/help',
      isLeaf: true,
    },
  ];

  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  // 获取所有父级菜单的 Key
  function getNonLeafKeys(treeData) {
    const keys = [];

    function traverse(data) {
      for (const node of data) {
        if (!node.isLeaf) {
          keys.push(node.key);
          traverse(node.children);
        }
      }
    }

    traverse(treeData);
    return keys;
  }

  // 展开的菜单
  const [expandedKeys, setExpandedKeys] = useState([]);

  function handleExpand() {
    if (expandedKeys.length) {
      // 收起菜单
      setExpandedKeys([]);
    } else {
      // 展开菜单
      let keys = getNonLeafKeys(treeData);
      setExpandedKeys(keys);
    }
  }

  const onExpand = (keys, _) => {
    setExpandedKeys(keys);
  };

  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div className="admin-main-content">
        <Row>
          <Col className="admin-main-content-left" span={6}>
            <div className="admin-list">
              <div className="admin-content-header">
                <Button type="primary" icon={<PlusOutlined />}>
                  添加菜单
                </Button>
                <Button style={{ marginLeft: '10px' }} icon={expandedKeys.length ? <FolderOutlined /> : <FolderOpenOutlined />} onClick={handleExpand}>
                  {expandedKeys.length ? '收起菜单' : '展开菜单'}
                </Button>
              </div>
              <div className="admin-content-box">
                <div className="admin-context-search">
                  <Search placeholder="输入菜单名称进行搜索" variant="borderless" onSearch={onSearch} />
                </div>
                <div>
                  <DirectoryTree multiple defaultExpandAll expandedKeys={expandedKeys} onSelect={onSelect} onExpand={onExpand} treeData={treeData} />
                </div>
              </div>
            </div>
          </Col>
          <Col className="admin-main-content-right" span={18}>
            <div className="admin-detail">
              <div className="admin-content-header">编辑菜单</div>
              <div className="admin-content-box">菜单详情数据</div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

const Menu = () => (
  <App>
    <MenuPage />
  </App>
);

export default Menu;
