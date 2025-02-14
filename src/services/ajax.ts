import axios from 'axios';
import { getUserToken } from '../utils/user-tokens';
// import { message } from 'antd';

export interface resType {
  code: number;
  data?: any;
  msg?: string;
}
export interface dataType {
  [key: string]: any;
}
const instance = axios.create({
  timeout: 60 * 1000,
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
      // TODO: 优化提示
      // message.error(msg);
      alert(msg);
    }
    throw new Error(msg);
  }
  return data;
});

export default instance;
