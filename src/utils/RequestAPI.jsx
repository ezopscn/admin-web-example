import { GET, POST } from './Request.jsx';
import { APIConfig } from '../common/Config.jsx'; // 接口请求

// 接口请求
export const GETTowFAStatusRequest = () => GET(APIConfig.TowFAStatusAPI); // 获取双因子认证开启状态
export const LoginRequest = (data) => POST(APIConfig.LoginAPI, data); // 用户登录
export const LogoutRequest = () => GET(APIConfig.LogoutAPI); // 用户注销

// 用户相关接口
export const GETUserCountRequest = () => GET(APIConfig.UserCountAPI); // 获取用户数量
export const GETCurrentUserInfoRequest = () => GET(APIConfig.CurrentUserInfoAPI); // 获取当前用户的信息
export const GETSpecifyUserInfoRequest = (username) => GET(APIConfig.SpecifyUserInfoAPI + username); // 获取指定用户的信息

// 角色相关接口
export const GETRoleCountRequest = () => GET(APIConfig.RoleCountAPI); // 获取角色数量

// 菜单相关接口
export const GETCurrentRoleMenuListRequest = () => GET(APIConfig.CurrentRoleMenuListAPI); // 获取角色菜单列表

// 部门相关接口
export const GETDepartmentListRequest = () => GET(APIConfig.DepartmentListAPI); // 获取部门列表
