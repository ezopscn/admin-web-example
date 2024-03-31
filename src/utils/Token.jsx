// 获取 Token
export const GetToken = () => {
  // 获取 Token 过期时间
  let tokenExpire = localStorage.getItem('token-expire');
  if (tokenExpire) {
    // 跟当前时间对比，判断是否过期
    let now = new Date().getTime();
    let timestamp = Date.parse(tokenExpire);
    if (now < timestamp) {
      return localStorage.getItem('token');
    }
  }
  // Token 过期或者没有 Token，直接清空 localStorage
  localStorage.clear();
  return null;
};

// 设置 Token 和过期时间
export const SetToken = (token, expire) => {
  localStorage.setItem('token', token);
  localStorage.setItem('token-expire', expire);
};
