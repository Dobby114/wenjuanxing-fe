import axios from 'axios';
import { getUserToken } from '../utils/user-tokens';
import { message } from 'antd';

export interface resType {
  code: number;
  data?: any;
  msg?: string;
}
export interface dataType {
  [key: string]: any;
}
const instance = axios.create({
  baseURL:'https://wenjuanxing-be.vercel.app',
  timeout: 60 * 1000,
  headers: {
    // 'Content-Type': 'application/json',
    'credentials': 'include',
  },
});
// 添加一个请求拦截器，在每次发起请求前，将token放到请求头中
// Bearer 是规定格式！
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getUserToken()}`;
    return config;
  },
  error => Promise.reject(error)
);
instance.interceptors.response.use(res => {
  const resData: resType = res.data || {};
  const { code, data, msg } = resData;
  if (code !== 0) {
    
    if (msg) {
      message.error(msg);
      // alert(msg);
    }
    throw new Error(msg);
  }
  return data;
},(error)=>{
  if (error.response) {
    // 服务器返回了响应但状态码不在 2xx 范围内
    const { status, data} = error.response;
    const {msg} = data || {}
    message.error(`${status} ${msg || '请求失败！'} !`)

    if (status === 401) {
      // 未授权，可以跳转到登录页
      window.location.href = '/login';
      return Promise.reject(msg ||'会话过期！请重新登陆！');
    } else if (status === 403) {
      return Promise.reject(msg ||'权限不足，无法访问此资源');
    } else if (status === 404) {
      return Promise.reject(msg ||'请求的资源不存在');
    } else if (status >= 500) {
      return Promise.reject(msg ||'服务器错误，请稍后再试');
    } else if (data && data.message) {
      return Promise.reject(data.message);
    } else {
      return Promise.reject(msg ||`请求失败: ${status}`);
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    return Promise.reject('网络错误，请检查您的连接');
  } else {
    // 请求配置出错
    return Promise.reject('请求配置错误');
  }
});

export default instance;
