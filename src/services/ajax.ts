import axios from 'axios';
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
  timeout: 60 * 1000,
});

instance.interceptors.response.use(res => {
  const resData: resType = res.data || {};
  const { code, data, msg } = resData;
  if (code !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data;
});

export default instance;
