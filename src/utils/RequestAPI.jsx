import { GET, POST } from './Request.jsx';
import { APIConfig } from '../common/Config.jsx'; // 接口请求

// 接口请求
export const GETTowFAStatusRequest = () => GET(APIConfig.TowFAStatusAPI); // 获取双因子认证开启状态
export const LoginRequest = (data) => POST(APIConfig.LoginAPI, data); // 用户登录
export const LogoutRequest = () => GET(APIConfig.LogoutAPI); // 用户注销