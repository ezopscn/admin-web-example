import React from 'react';
import { DefaultAvatar } from '../../common/Image.jsx';
import { Avatar, Statistic } from 'antd';

// 问候语
function getHelloWord(name) {
  let arr = ['日', '一', '二', '三', '四', '五', '六'];
  let day = new Date();
  let hour = day.getHours();
  let week = day.getDay();
  let hello = name + '，今天是星期' + arr[week];
  if (hour > 22) {
    hello = hello + '，别卷了，要好好休息哦 ~';
  } else if (hour > 18) {
    hello = hello + '，适当加班，然后早点回家吧 ~';
  } else if (hour > 14) {
    hello = hello + '，如果困了，来杯咖啡提神吧 ~';
  } else if (hour > 11) {
    hello = hello + '，好好吃饭，好好休息，中午不睡下午崩溃哦 ~';
  } else if (hour > 6) {
    hello = hello + '，新的一天，也要元气满满哦 ~';
  } else if (hour > 3) {
    hello = hello + '，也太早了吧，你是还没睡吗 ~';
  } else {
    hello = hello + '，这个时候不是应该睡觉吗 ~';
  }
  return hello;
}

const DashboardHeader = () => {
  // 问候语
  let helloWord = getHelloWord("吴彦祖（Jayce）");

  return (
    <div className='admin-dashboard-header'>
      <div className='admin-dashboard-header-left'>
        <div className='admin-dashboard-header-avatar'>
          <Avatar size={60} src={DefaultAvatar} />
        </div>
        <div className='admin-dashboard-header-info'>
          <div className='admin-dashboard-header-hello'>{helloWord}</div>
          <div className='admin-dashboard-header-job'>高级运维工程师 | 集团总部 - 研发中心 - 运维部 - 运维开发组</div>
        </div>
      </div>
      <div className='admin-dashboard-header-right'>
        <Statistic title='用户数量' value={1024} />
        <Statistic title='入职天数' value={2048} />
        <Statistic title='集群数量' value={4096} />
      </div>
    </div>
  );
};

export default DashboardHeader;