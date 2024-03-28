import { GetToken } from '../utils/Token.jsx';
import { Navigate, useLocation } from 'react-router';
import RouteData from './RouteData.jsx';

// 路由匹配
export const MatchRoute = (path, prefix, routes) => {
  for (let item of routes) {
    let ipath = item.path;

    // 判断是否有前缀，如果有，则需要拼接
    if (prefix !== '' && prefix !== '/') {
      ipath = prefix + '/' + ipath;
    }

    // 如果不是 / 开头则需要补上
    if (!ipath.startsWith('/')) {
      ipath = '/' + ipath;
    }

    // 判断是否匹配
    if (ipath === path) {
      return item;
    }

    // 都不匹配则判断是否有 children
    if (item.children) {
      prefix = ipath;
      MatchRoute(path, prefix, item.children);
      prefix = '';
    }
  }
  return {};
};

// 路由拦截
export const AuthRouter = ({ children }) => {
  // 获取 Token
  const token = GetToken();

  // 获取当前 URI
  const { pathname } = useLocation();

  // 判断请求的路由是否在路由列表中
  const r = MatchRoute(pathname, '', RouteData);
  if (r.notNeedAuth) {
    // 登录页需要单独进行处理，如果用户已经登录，还访问登录页，需要给他跳转掉
    if (pathname === '/login' && token) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  }

  // 判断 Token，不存在则返回登录页，登录了访问登录页则会跳转到首页
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};