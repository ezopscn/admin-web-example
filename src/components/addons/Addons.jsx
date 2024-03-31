import React from 'react';

// 公共页面 Header
const CommonPageHeader = (props) => {
  return (
    <div className="admin-common-page-header">
      <div className="admin-common-page-header-box">
        <div className="admin-common-page-header-title">{props.title}</div>
        <div className="admin-common-page-header-content">{props.tips}</div>
      </div>
    </div>
  );
};

export { CommonPageHeader };