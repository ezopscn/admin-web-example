import { proxy } from 'valtio';

// 用户
export const UserStates = proxy({
  CurrentUserInfo: {}, // 当前用户信息
});