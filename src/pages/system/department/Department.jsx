import React, { useEffect, useState } from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { Alert, App, Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Tree } from 'antd';
import { FolderOpenOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { GETAllUserListRequest, GETDepartmentListRequest } from '../../../utils/RequestAPI.jsx';
import { GenerateTreeData, GetNotLeafKeys } from '../../../utils/Tree.jsx';
import { useSnapshot } from 'valtio';
import { UserStates } from '../../../stores/Stores.jsx';

const { Search } = Input;
const { DirectoryTree } = Tree;

// 表单布局
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

// 表单按钮布局
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 19,
  },
};

// 页面标题
const Title = '部门管理 / DEPARTMENT MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>
        用户可以对部门进行添加，修改等操作，但需要注意：为了保证系统数据安全性，部门删除操作只有系统预留的超级管理员才具备，同时属于软删除，数据库中的数据还在。同时，如果部门下面还有子部门，该部门也无法被删除。
      </li>
      <li>
        一个用户可以属于多个部门，也可以管理多个部门，毕竟工作中一个人身兼数职的情况是屡见不鲜的。同时，系统也默认预留了两个部门：
        <ul>
          <li>
            <b>公司</b>：系统预留最顶级的部门，也就是公司本身，管理员后续可以根据实际情况修改它的名称，但不能删除，老板和超级管理员都应该隶属于它。
          </li>
          <li>
            <b>访客</b>：系统预留的访客部门，不允许修改，删除等，用户在没有部门的时候默认处于该部门。
          </li>
        </ul>
      </li>
    </ul>
  );
};

const DepartmentPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { CurrentUserInfo } = useSnapshot(UserStates);

  // 提示说明信息
  const formExtra = {
    name: '部门名称，没有唯一限制，但是尽可能不重复。',
    parent: '父级部门，最高级别的部门就是公司本身，不推荐多个平级公司存在。',
    manager: '部门负责人，并非所有部门的部门都需要配置部门负责人。',
  };

  ///////////////////////////////////////////////////////////////////////////
  // 基础数据
  ///////////////////////////////////////////////////////////////////////////
  // 获取所有部门列表
  const [departmentList, setDepartmentList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await GETDepartmentListRequest();
        if (res.code === 200) {
          setDepartmentList(res.data?.list);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);

  // 部门树数据
  let treeData = [];
  if (departmentList) {
    treeData = GenerateTreeData(0, departmentList);
  }

  // 获取所有用户列表
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await GETAllUserListRequest();
        if (res.code === 200) {
          setUserList(res.data?.list);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  // 展开和收起菜单按钮
  ///////////////////////////////////////////////////////////////////////////
  // 所有展开和收起
  const [expandedKeys, setExpandedKeys] = useState([]);
  const handleAllTreeExpand = () => {
    if (expandedKeys.length) {
      // 收起菜单
      setExpandedKeys([]);
    } else {
      // 展开菜单
      let keys = GetNotLeafKeys(treeData);
      setExpandedKeys(keys);
    }
  };

  // 展开和收起
  const onTreeExpand = (keys, _) => {
    setExpandedKeys(keys);
  };

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

  // 选中的部门信息
  const [departmentInfo, setDepartmentInfo] = useState({});
  const onSelect = (keys, _) => {
    for (const dept of departmentList) {
      if (dept.id === keys[0]) {
        setDepartmentInfo(dept);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////
  // 编辑菜单相关
  ///////////////////////////////////////////////////////////////////////////
  const [editForm] = Form.useForm();
  const onEditFormFinish = (values) => {};

  const onDeleteDepartment = (id) => {};

  // 编辑菜单初始化回填表单数据
  useEffect(() => {
    editForm.setFieldsValue({
      id: departmentInfo?.id,
      name: departmentInfo?.name,
      parent_id: departmentInfo?.parent_id,
    });
  }, [departmentInfo]);

  // 生成筛选部门列表
  let parentDepartmentSelectItems = [{ label: '系统本身', value: 0 }];
  if (departmentList) {
    for (const dept of departmentList) {
      parentDepartmentSelectItems.push({ label: dept.name, value: dept.id });
    }
  }

  // 生成部门负责人筛选列表
  let manageUserSelectItems = [];
  if (userList) {
    for (const user of userList) {
      manageUserSelectItems.push({
        label: user.cn_name + '/' + user.en_name + '（' + user.username + '）',
        value: user.id,
      });
    }
  }

  // 父级部门搜索
  const parentDepartmentFilterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  // 部门负责人搜索
  const manageUserFilterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  ///////////////////////////////////////////////////////////////////////////
  // 添加部门相关
  ///////////////////////////////////////////////////////////////////////////
  const [addForm] = Form.useForm();
  // 添加部门框状态
  const [showDepartmentAddModal, setShowDepartmentAddModal] = useState(false);

  const onAddFormFinish = (values) => {};

  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div className="admin-main-content">
        <Row>
          <Col className="admin-main-content-left" span={6}>
            <div className="admin-list">
              <div className="admin-content-header">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setShowDepartmentAddModal(true);
                  }}>
                  添加部门
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleAllTreeExpand} icon={expandedKeys.length ? <FolderOutlined /> : <FolderOpenOutlined />}>
                  {expandedKeys.length ? '收起部门' : '展开部门'}
                </Button>
              </div>
              <div className="admin-content-box">
                <div className="admin-context-search">
                  <Search placeholder="输入部门名称进行搜索" variant="borderless" onChange={(e) => onSearch(e.target.value)} />
                </div>
                <div>
                  <DirectoryTree showLine multiple treeData={treeData} onExpand={onTreeExpand} expandedKeys={expandedKeys} filterTreeNode={filterTreeNode} onSelect={onSelect} />
                </div>
              </div>
            </div>
          </Col>
          <Col className="admin-main-content-right" span={18}>
            <div className="admin-detail">
              <div className="admin-content-header">编辑部门</div>
              <div className="admin-content-box">
                <div style={{ marginBottom: departmentInfo?.name ? '40px' : '0' }}>
                  <Alert message="点击左侧部门列表中的任意一项后，则可对部门进行编辑" type="info" showIcon />
                </div>
                <div>
                  {departmentInfo?.name ? (
                    <Form {...layout} form={editForm} name="edit-menu-info" onFinish={onEditFormFinish}>
                      <Form.Item name="id" label="id" hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item name="name" label="部门名称" extra={formExtra.name} rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="parent_id" label="父级部门" extra={formExtra.parent} rules={[{ required: true }]}>
                        <Select showSearch placeholder="选择父级部门" optionFilterProp="children" filterOption={parentDepartmentFilterOption} options={parentDepartmentSelectItems} />
                      </Form.Item>
                      <Form.Item name="manager" label="部门负责人" extra={formExtra.manager}>
                        <Select showSearch mode="multiple" placeholder="选择部门负责人" optionFilterProp="children" filterOption={manageUserFilterOption} options={manageUserSelectItems} />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            保存修改
                          </Button>
                          {CurrentUserInfo?.role_id === 1 ? (
                            <Popconfirm title="是否确定删除该部门？" okText="确定" okType="danger" cancelText="取消" onConfirm={() => onDeleteDepartment(departmentInfo?.id)}>
                              <Button danger>删除部门</Button>
                            </Popconfirm>
                          ) : null}
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
      {/*添加部门表单*/}
      <Modal title="添加部门" className="admin-modal-form" centered open={showDepartmentAddModal} maskClosable={false} footer={null} onCancel={() => setShowDepartmentAddModal(false)}>
        <Form form={addForm} name="add-menu" layout="vertical" onFinish={onAddFormFinish} style={{ marginTop: '25px' }}>
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="部门名称" extra={formExtra.name} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parent_id" label="父级部门" extra={formExtra.parent} rules={[{ required: true }]}>
            <Select showSearch placeholder="选择父级部门" optionFilterProp="children" filterOption={parentDepartmentFilterOption} options={parentDepartmentSelectItems} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              添加部门
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Department = () => (
  <App>
    <DepartmentPage />
  </App>
);

export default Department;
