// 创建实例
import { GetToken } from './Token.jsx';
import axios from 'axios';

const instance = axios.create({
  // 请求超时时间
  timeout: 5000
});

// 请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在请求头中添加 Token
    config.headers.Authorization = 'Bearer ' + GetToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// GET 请求
export const GET = (url, params) => instance.get(url, params).then((res) => res.data);

// POST 请求
export const POST = (url, data) => instance.post(url, data).then((res) => res.data);

// PUT 请求
export const PUT = (url, data) => instance.put(url, data).then((res) => res.data);

// PATCH 请求
export const PATCH = (url, data) => instance.patch(url, data).then((res) => res.data);

// DELETE 请求
export const DELETE = (url) => instance.delete(url).then((res) => res.data);
