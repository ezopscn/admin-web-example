import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
// 中文支持
import zhCN from 'antd/es/locale/zh_CN';
// 小米字体
import 'misans/lib/Normal/MiSans-Regular.min.css';
// 附加样式
import './assets/css/admin-antd.less';
import './assets/css/admin.less';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // autoInsertSpaceInButton：解决按钮的文本为两个汉字时中间自动补充空格的问题
  // theme：修改默认主题，参考文档：https://ant-design.antgroup.com/docs/react/customize-theme-cn
  <ConfigProvider
    locale={zhCN}
    autoInsertSpaceInButton={false}
    theme={{
      token: {
        colorPrimary: '#165CFF', // 主颜色
        colorInfo: '#165CFF', // Info 颜色
        colorLink: '#165CFF', // 链接颜色
        borderRadius: 0, // 圆角
        // motion: false, // 关闭动画
        fontFamily: 'MiSans, serif', // 文字字体
        fontSize: 13, // 默认字号
        controlHeight: 30, // 按钮和输入框等基础控件的高度
      },
    }}>
    <App />
  </ConfigProvider>,
);
