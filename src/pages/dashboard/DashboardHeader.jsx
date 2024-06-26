import React, { useEffect, useState } from 'react';
import { DefaultAvatar } from '../../common/Image.jsx';
import { App, Avatar, Statistic } from 'antd';
import { useSnapshot } from 'valtio';
import { UserStates } from '../../stores/Stores.jsx';
import { GETDepartmentListRequest, GETRoleCountRequest, GETUserCountRequest } from '../../utils/RequestAPI.jsx';
import { GetDepartmentTreeName } from '../../utils/Tree.jsx';

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

const DashboardHeaderPage = () => {
  const { message } = App.useApp();
  // 当前用户信息
  const { CurrentUserInfo } = useSnapshot(UserStates);

  // 问候语
  let helloWord = getHelloWord(CurrentUserInfo?.cn_name + '（' + CurrentUserInfo?.en_name + '）');
  // 入职天数计算
  const today = new Date();
  const diffTime = today.getTime() - new Date(CurrentUserInfo?.join_time).getTime();
  const joinDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // 用户/角色总数
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  useEffect(() => {
    // 用户统计
    (async () => {
      try {
        const res = await GETUserCountRequest();
        if (res.code === 200) {
          setUserCount(res.data?.count);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })(userCount, roleCount);

    // 角色统计
    (async () => {
      try {
        const res = await GETRoleCountRequest();
        if (res.code === 200) {
          setRoleCount(res.data?.count);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);

  // 部门信息
  const [departmentName, setDepartmentName] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const res = await GETDepartmentListRequest();
        if (res.code === 200) {
          let name = '';
          if (CurrentUserInfo?.departments) {
            for (const dept of CurrentUserInfo?.departments) {
              name = name + ' | ' + GetDepartmentTreeName(dept.id, res.data?.list);
            }
          }
          setDepartmentName(name);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, [departmentName, CurrentUserInfo]);

  return (
    <div className="admin-dashboard-header">
      <div className="admin-dashboard-header-left">
        <div className="admin-dashboard-header-avatar">
          <Avatar size={60} src={DefaultAvatar} />
        </div>
        <div className="admin-dashboard-header-info">
          <div className="admin-dashboard-header-hello">{helloWord}</div>
          <div className="admin-dashboard-header-job">
            {CurrentUserInfo?.job?.name}
            {departmentName}
          </div>
        </div>
      </div>
      <div className="admin-dashboard-header-right">
        <Statistic title="用户数量" value={userCount} />
        <Statistic title="角色数量" value={roleCount} />
        <Statistic title="入职天数" value={joinDays} />
      </div>
    </div>
  );
};

const DashboardHeader = () => (
  <App>
    <DashboardHeaderPage />
  </App>
);

export default DashboardHeader;
