import React, { useEffect, useState } from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { Alert, App, Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Tree } from 'antd';
import { FolderOpenOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { AddMenuRequest, DeleteMenuRequest, GETAllMenuRequest, UpdateMenuRequest } from '../../../utils/RequestAPI.jsx';
import { GenerateMenuTreeData } from '../../../utils/MenuTree.jsx';
import { useNavigate } from 'react-router';

const { confirm } = Modal;
const { Search } = Input;
const { DirectoryTree } = Tree;

// 表单布局
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

// 表单按钮布局
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 19
  }
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
        菜单图标来源于
        <a href="https://ant-design.antgroup.com/components/icon-cn" target="_blank">
          <b> ANT DESIGN ICON </b>
        </a>
        名称，只有名称正确了，页面上才能正常的显示。子菜单不推荐配置图标，会影响整体视觉效果。
      </li>
    </ul>
  );
};


// 参考页面：https://arco.naiveadmin.com/system/menu
const MenuPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  // 提示说明信息
  const formExtra = {
    label: '菜单名称，要求全局唯一，避免干扰，影响用户体验。',
    key: '菜单访问路由，要求全局唯一，如果是子菜单，需要拼接上父级菜单路由。',
    icon: '菜单图标名称，只有顶级菜单需要填写，图标来源于 ANT DESIGN ICON。',
    sort: '同一级菜单的排序，支持 0-100，数字越小越靠前，具体数字推荐参考同级菜单。',
    parent: '顶级菜单直接选择顶级菜单，子菜单则层级不推荐超过两层。'
  };

  ///////////////////////////////////////////////////////////////////////////
  // 基础数据
  ///////////////////////////////////////////////////////////////////////////
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

  // 菜单树数据
  let treeData = [];
  if (menuList) {
    treeData = GenerateMenuTreeData(0, menuList);
  }

  ///////////////////////////////////////////////////////////////////////////
  // 展开和收起菜单按钮
  ///////////////////////////////////////////////////////////////////////////
  // 获取所有父级菜单的 Key，用于展开所有菜单
  const getNotLeafKeys = (treeData) => {
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

  // 所有菜单的展开和收起
  const [expandedKeys, setExpandedKeys] = useState([]);
  const handleAllMenuTreeExpand = () => {
    if (expandedKeys.length) {
      // 收起菜单
      setExpandedKeys([]);
    } else {
      // 展开菜单
      let keys = getNotLeafKeys(treeData);
      setExpandedKeys(keys);
    }
  };

  // 菜单树展开和收起
  const onMenuTreeExpand = (keys, _) => {
    setExpandedKeys(keys);
  };

  ///////////////////////////////////////////////////////////////////////////
  // 菜单搜索
  ///////////////////////////////////////////////////////////////////////////
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  ///////////////////////////////////////////////////////////////////////////
  // 编辑菜单相关
  ///////////////////////////////////////////////////////////////////////////
  const [editForm] = Form.useForm();
  // 提交编辑菜单
  const onEditFormFinish = async (values) => {
    try {
      const res = await UpdateMenuRequest(values);
      if (res.code === 200) {
        message.success('菜单修改成功', 1).then(() => {
          // 延时执行，避免出现 message 还没显示就刷新了
          navigate(0);
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
      message.error('服务器异常，请联系管理员');
    }
  };

  // 删除菜单
  const onDeleteMenu = async (id) => {
    try {
      const res = await DeleteMenuRequest(id);
      if (res.code === 200) {
        message.success('菜单删除成功', 1).then(() => {
          // 延时执行，避免出现 message 还没显示就刷新了
          navigate(0);
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
      message.error('服务器异常，请联系管理员');
    }
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

  // 编辑菜单初始化回填表单数据
  useEffect(() => {
    editForm.setFieldsValue({
      id: menuInfo?.id,
      label: menuInfo?.label,
      key: menuInfo?.key,
      icon: menuInfo?.icon,
      sort: menuInfo?.sort,
      parent_id: menuInfo?.parent_id
    });
  }, [menuInfo]);

  // 生成筛选菜单列表
  let parentMenuSelectItems = [{ label: '顶级菜单', value: 0 }];
  if (menuList) {
    for (const menu of menuList) {
      parentMenuSelectItems.push({ label: menu.label, value: menu.id });
    }
  }

  // 父级菜单搜索调整
  const parentMenuFilterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  ///////////////////////////////////////////////////////////////////////////
  // 添加菜单相关
  ///////////////////////////////////////////////////////////////////////////
  const [addForm] = Form.useForm();
  // 添加菜单菜单框状态
  const [showMenuAddModal, setShowMenuAddModal] = useState(false);

  // 提交新增菜单
  const onAddFormFinish = async (values) => {
    try {
      const res = await AddMenuRequest(values);
      if (res.code === 200) {
        message.success('菜单添加成功', 1).then(() => {
          // 延时执行，避免出现 message 还没显示就刷新了
          navigate(0);
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
      message.error('服务器异常，请联系管理员');
    }
  };

  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div className="admin-main-content">
        <Row>
          <Col className="admin-main-content-left" span={6}>
            <div className="admin-list">
              <div className="admin-content-header">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                  setShowMenuAddModal(true);
                }}>
                  添加菜单
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleAllMenuTreeExpand}
                        icon={expandedKeys.length ? <FolderOutlined /> : <FolderOpenOutlined />}>
                  {expandedKeys.length ? '收起菜单' : '展开菜单'}
                </Button>
              </div>
              <div className="admin-content-box">
                <div className="admin-context-search">
                  <Search placeholder="输入菜单名称进行搜索" variant="borderless" onSearch={onSearch} />
                </div>
                <div>
                  <DirectoryTree multiple defaultExpandAll expandedKeys={expandedKeys} onSelect={onSelect}
                                 onExpand={onMenuTreeExpand} treeData={treeData} />
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
                    <Form {...layout} form={editForm} name="edit-menu-info" onFinish={onEditFormFinish}>
                      <Form.Item name="id" label="id" hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item name="label" label="名称" extra={formExtra.label} rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="key" label="路径" extra={formExtra.key} rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="icon" label="图标" extra={formExtra.icon}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="sort" label="排序" extra={formExtra.sort}>
                        <InputNumber min={0} max={100} style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item name="parent_id" label="父级菜单" extra={formExtra.parent}
                                 rules={[{ required: true }]}>
                        <Select
                          showSearch
                          placeholder="选择父级菜单"
                          optionFilterProp="children"
                          filterOption={parentMenuFilterOption}
                          options={parentMenuSelectItems}
                        />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Space>
                          <Button type="primary" htmlType="submit">保存修改</Button>
                          <Popconfirm
                            title="是否确定永久的删除该菜单？"
                            okText="确定"
                            okType="danger"
                            cancelText="取消"
                            onConfirm={() => onDeleteMenu(menuInfo?.id)}
                          >
                            <Button danger>删除菜单</Button>
                          </Popconfirm>
                        </Space>
                      </Form.Item>
                    </Form>
                  ) : (
                    <Form form={editForm}></Form> // 避免第一次访问 form 没被使用提示
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/*添加菜单表单*/}
      <Modal title="添加菜单" className="admin-modal-form" centered open={showMenuAddModal} maskClosable={false}
             footer={null} onCancel={() => (setShowMenuAddModal(false))}>
        <Form form={addForm} name="add-menu" layout="vertical" onFinish={onAddFormFinish}
              style={{ marginTop: '25px' }}>
          <Form.Item name="label" label="名称" extra={formExtra.label} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="key" label="路径" extra={formExtra.key} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="图标" extra={formExtra.icon}>
            <Input />
          </Form.Item>
          <Form.Item name="sort" label="排序" extra={formExtra.sort}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="parent_id" label="父级菜单" extra={formExtra.parent} rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="选择父级菜单"
              optionFilterProp="children"
              filterOption={parentMenuFilterOption}
              options={parentMenuSelectItems}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>添加菜单</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Menu = () => (
  <App>
    <MenuPage />
  </App>
);

export default Menu;
