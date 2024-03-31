// 后端接口前缀

const backendUrl = window.CONFIG.backendUrl;

// 接口信息
const APIConfig = {
  RunEnv: window.CONFIG.env, // 运行环境
  BaseURL: backendUrl, // 基础连接
  TowFAStatusAPI: backendUrl + '/2fa/status', // 2FA 状态接口
  LoginAPI: backendUrl + '/login', // 登录接口
  LogoutAPI: backendUrl + '/logout', // 登出接口
  // 用户相关
  UserCountAPI: backendUrl + '/user/count', // 用户总数接口
  CurrentUserInfoAPI: backendUrl + '/user/info', // 获取当前用户的信息
  SpecifyUserInfoAPI: backendUrl + '/user/info/', // 获取指定用户的信息
  // 角色相关
  RoleCountAPI: backendUrl + '/role/count', // 角色总数接口
  // 菜单相关
  CurrentRoleMenuListAPI: backendUrl + '/menu/list', // 当前角色菜单列表接口
  AllMenuAPI: backendUrl + '/menu/all', // 获取所有菜单接口
  // 部门相关
  DepartmentListAPI: backendUrl + '/department/list', // 获取部门列表接口
};

export { APIConfig };
