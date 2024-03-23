// 后端接口前缀
const backendUrl = window.CONFIG.backendUrl;

// 接口信息
const APIConfig = {
  // 运行环境
  RunEnv: window.CONFIG.env,
  // 基础连接
  BaseURL: backendUrl,
  // 登录接口
  LoginAPI: backendUrl + '/login',
  // 登出接口
  LogoutAPI: backendUrl + '/logout'
};

export { APIConfig };