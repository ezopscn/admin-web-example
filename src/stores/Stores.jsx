import { proxy } from 'valtio';

// Layout
export const LayoutStates = proxy({
  MenuSiderCollapsed: false, // 是否收起侧边菜单栏
  MenuOpenKeys: [], // 默认展开的菜单
  MenuSelectKeys: [] // 默认选中的菜单
});

// 用户
export const UserStates = proxy({
  CurrentUserInfo: {} // 当前用户信息
});