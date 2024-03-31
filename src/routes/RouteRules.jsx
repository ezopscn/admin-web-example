import { useRoutes } from 'react-router';
import RouteData from './RouteData.jsx';

// 生成路由规则
const RouteRules = () => {
  return useRoutes(RouteData);
};

export default RouteRules;
