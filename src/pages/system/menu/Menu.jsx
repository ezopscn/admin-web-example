import React, { useEffect, useState } from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { Alert, App, Button, Col, Form, Input, InputNumber, Row, Select, Space, Tree } from 'antd';
import { FolderOpenOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { GETAllMenuRequest } from '../../../utils/RequestAPI.jsx';
import { GenerateTreeData } from '../../../utils/MenuTree.jsx';

const { Search } = Input;

const { DirectoryTree } = Tree;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 19,
  },
};

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

// 参考页面：https://arco.naiveadmin.com/system/menu
const MenuPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // 获取所有菜单列表
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await GETAllMenuRequest();
        if (res.code === 200) {
          setMenuList(res.data?.menus);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);

  let treeData = [];
  if (menuList) {
    treeData = GenerateTreeData(0, menuList);
  }

  // 获取所有父级菜单的 Key
  const getNonLeafKeys = (treeData) => {
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
  };

  // 展开的菜单
  const [expandedKeys, setExpandedKeys] = useState([]);
  const handleExpand = () => {
    if (expandedKeys.length) {
      // 收起菜单
      setExpandedKeys([]);
    } else {
      // 展开菜单
      let keys = getNonLeafKeys(treeData);
      setExpandedKeys(keys);
    }
  };

  const onExpand = (keys, _) => {
    setExpandedKeys(keys);
  };

  // 菜单信息
  const [menuInfo, setMenuInfo] = useState({});
  const onSelect = (keys, _) => {
    for (const menu of menuList) {
      if (menu.key === keys[0]) {
        setMenuInfo(menu);
      }
    }
  };

  // 初始化回填表单数据
  useEffect(() => {
    form.setFieldsValue({
      label: menuInfo?.label,
      key: menuInfo?.key,
      icon: menuInfo?.icon,
      sort: menuInfo?.sort,
      parent_id: menuInfo?.parent_id,
    });
  }, [menuInfo]);

  // 生成筛选菜单列表
  let parentMenuSelectItems = [{ label: '顶级菜单', value: 0 }];
  if (menuList) {
    for (const menu of menuList) {
      parentMenuSelectItems.push({ label: menu.label, value: menu.id });
    }
  }

  const onParentMenuChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onParentMenuSearch = (value) => {
    console.log('search:', value);
  };

  const parentMenuFilterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
              <div className="admin-content-box">
                <div style={{ marginBottom: menuInfo?.label ? '40px' : '0' }}>
                  <Alert message="点击菜单列表任意一项后，可进行编辑" type="info" showIcon />
                </div>
                <div>
                  {menuInfo?.label ? (
                    <Form {...layout} form={form} name="menu-info" onFinish={onFinish}>
                      <Form.Item
                        name="label"
                        label="名称"
                        extra="菜单的名称，要求全局唯一，避免干扰，影响用户体验。"
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="key"
                        label="路径"
                        extra="菜单的路径，也就是访问的路由，要求全局唯一，路径以 / 开头，如果是子菜单，需要拼接上父级菜单路由。"
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="icon" label="图标" extra="菜单显示的图标，只需要图标名称，只有顶级菜单需要填写，图标来源于 ANT DESIGN ICON。">
                        <Input />
                      </Form.Item>
                      <Form.Item name="sort" label="排序" extra="同一级菜单的排序，支持 0-100，数字越小越靠前，具体数字推荐参考父菜单。">
                        <InputNumber min={0} max={100} defaultValue={0} style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item
                        name="parent_id"
                        label="父级菜单"
                        extra="如果是顶级菜单，请单独选择顶级菜单，如果是子菜单，建议子菜单的层级不要超过两层。"
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Select
                          showSearch
                          placeholder="选择父级菜单"
                          optionFilterProp="children"
                          onChange={onParentMenuChange}
                          onSearch={onParentMenuSearch}
                          filterOption={parentMenuFilterOption}
                          options={parentMenuSelectItems}
                        />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            保存修改
                          </Button>
                          <Button htmlType="button" onClick={onReset}>
                            重置数据
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  ) : (
                    <Form form={form}></Form> // 避免第一次访问 form 没被使用提示
                  )}
                </div>
              </div>
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
