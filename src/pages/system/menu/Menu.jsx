import React, { useEffect, useState } from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { Alert, App, Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Tree } from 'antd';
import { FolderOpenOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { AddMenuRequest, DeleteMenuRequest, GETAllMenuRequest, UpdateMenuRequest } from '../../../utils/RequestAPI.jsx';
import { GenerateMenuTreeData, GetNotLeafKeys } from '../../../utils/Tree.jsx';
import { useNavigate } from 'react-router';

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
      <li>用户可以对菜单进行添加，修改，删除等操作，但需要注意：
        <ul>
          <li>菜单删除属于危险操作，为了保证系统数据安全性，菜单删除属于软删除，数据库中的数据不会真正的被删除，这也导致如果后续新添加一个同名的或者同路径的菜单时，系统会提示添加失败。</li>
          <li>如果遇到该问题，用户需要联系系统管理员对数据库中已删除的同名或者同路径的菜单数据进行修改调整，以此避免和新增的菜单发生冲突。</li>
        </ul>
      </li>
      <li>
        菜单图标来源于
        <a href="https://ant-design.antgroup.com/components/icon-cn" target="_blank">
          <b> ANT DESIGN ICON </b>
        </a>
        名称（比如 <b>HomeOutlined</b>），只有名称正确了，页面上才能正常的显示。需要注意：为了界面美观，顶级菜单必需配置图标，子菜单则不允许配置图标。
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
    label: '菜单显示名称，要求全局唯一，避免干扰，影响用户体验。',
    key: '菜单访问路由，要求全局唯一，如果是子菜单，需要拼接上父级菜单路由。',
    icon: '菜单图标名称，只有顶级菜单需要填写，图标来源于 ANT DESIGN ICON。',
    sort: '菜单排列排序，支持 0-100，数字越小越靠前，具体数字推荐参考同级菜单。',
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
  // 所有菜单的展开和收起
  const [expandedKeys, setExpandedKeys] = useState([]);
  const handleAllMenuTreeExpand = () => {
    if (expandedKeys.length) {
      // 收起菜单
      setExpandedKeys([]);
    } else {
      // 展开菜单
      let keys = GetNotLeafKeys(treeData);
      setExpandedKeys(keys);
    }
  };

  // 菜单树展开和收起
  const onMenuTreeExpand = (keys, _) => {
    setExpandedKeys(keys);
  };

  // 在第一次渲染时,设置所有节点的 key 为 expandedKeys
  // useEffect(() => {
  //   let keys = GetNotLeafKeys(treeData);
  //   setExpandedKeys(keys);
  // }, [treeData.length]);

  ///////////////////////////////////////////////////////////////////////////
  // 菜单搜索
  ///////////////////////////////////////////////////////////////////////////
  const [searchKeyword, setSearchKeyword] = useState('');
  // 搜索
  const onSearch = (value) => {
    setSearchKeyword(value);
    // 搜索的时候自动展开所有菜单
    let keys = GetNotLeafKeys(treeData);
    setExpandedKeys(keys);
  };
  // 搜索结果筛选，默认筛选中的样式有问题，需要自己加 css 样式
  const filterTreeNode = (treeNode) => {
    if (searchKeyword === '') {
      return false;
    }
    return treeNode?.title.indexOf(searchKeyword) > -1;
  };


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
                  <Search placeholder="输入菜单名称进行搜索" variant="borderless"
                          onChange={(e) => onSearch(e.target.value)} />
                </div>
                <div>
                  <DirectoryTree showLine multiple onSelect={onSelect} expandedKeys={expandedKeys}
                                 onExpand={onMenuTreeExpand} treeData={treeData} filterTreeNode={filterTreeNode} />
                </div>
              </div>
            </div>
          </Col>
          <Col className="admin-main-content-right" span={18}>
            <div className="admin-detail">
              <div className="admin-content-header">编辑菜单</div>
              <div className="admin-content-box">
                <div style={{ marginBottom: menuInfo?.label ? '40px' : '0' }}>
                  <Alert message="点击左侧菜单列表中的任意一项后，则可对该菜单进行编辑" type="info" showIcon />
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
                            title="是否确定删除该菜单？"
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
