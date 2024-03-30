import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '部门管理 / DEPARTMENT MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对部门进行添加，修改，删除等，但需要注意，如果该部门下面还有用户，则该部门无法删除。</li>
      <li>
        一个用户可以存在于多个部门，毕竟现实工作中一个人身兼数职的情况是屡见不鲜的。系统默认预留了两个部门：
        <ul>
          <li>
            <b>公司</b>：系统预留最顶级的部门，也就是公司本身，管理员后续可以根据实际情况修改它的名称，但无法修改，老板和超级管理员都应该隶属于它。
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
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>Department</div>
    </>
  );
};

const Department = () => (
  <App>
    <DepartmentPage />
  </App>
);

export default Department;
