import React from 'react';
import { CommonPageHeader } from '../../../components/addons/Addons.jsx';
import { App } from 'antd';

// 页面标题
const Title = '岗位管理 / JOB MANAGEMENT';

// 页面提示
const PageHeaderTips = () => {
  return (
    <ul>
      <li>管理用户可以对岗位进行添加，修改，删除等，但需要注意，如果该岗位下面还有用户，则该岗位无法删除。</li>
    </ul>
  );
};

const JobPage = () => {
  return (
    <>
      <CommonPageHeader title={Title} tips={<PageHeaderTips />} />
      <div>JOB</div>
    </>
  );
};

const Job = () => (
  <App>
    <JobPage />
  </App>
);

export default Job;
