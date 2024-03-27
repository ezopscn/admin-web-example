import { GET } from './Request.jsx';
import { APIConfig } from '../common/Config.jsx'; // 接口请求

// 接口请求
export const GETTowFAStatusRequest = () => GET(APIConfig.TowFAStatusAPI); // 获取双因子认证开启状态