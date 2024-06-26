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
  AllUserListAPI: backendUrl + '/user/all', // 获取所有用户基础信息列表
  // 角色相关
  RoleCountAPI: backendUrl + '/role/count', // 角色总数接口
  // 菜单相关
  CurrentRoleMenuListAPI: backendUrl + '/menu/list', // 当前角色菜单列表接口
  AllMenuAPI: backendUrl + '/menu/all', // 获取所有菜单接口
  AddMenuAPI: backendUrl + '/menu', // 添加菜单接口
  UpdateMenuAPI: backendUrl + '/menu', // 编辑菜单接口
  DeleteMenuAPI: backendUrl + '/menu/', // 删除菜单接口
  // 部门相关
  DepartmentListAPI: backendUrl + '/department/list', // 获取部门列表接口
  AddDepartmentAPI: backendUrl + '/department', // 添加部门接口
  UpdateDepartmentAPI: backendUrl + '/department', // 编辑部门接口
  DeleteDepartmentAPI: backendUrl + '/department/' // 删除部门接口
};

export { APIConfig };
