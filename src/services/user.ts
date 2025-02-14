import axios, { dataType } from './ajax';

// TODO: 之后再来改造，实现用户手机、微信扫码等登陆方式
interface userAccountInfo {
  username: string;
  //   nickName: string;
  password: string;
}

// 获取用户信息
export async function getUserInfo(): Promise<dataType> {
  const url = '/api/user';
  const result: dataType = await axios.get(url);
  return result;
}
// 用户注册
export async function userRegister(data: userAccountInfo): Promise<dataType> {
  const url = '/api/user/register';
  const result: dataType = await axios.post(url, { data });
  return result;
}
// 用户登陆
export async function userLogin(data: userAccountInfo): Promise<dataType> {
  const url = '/api/user/login';
  const result: dataType = await axios.post(url, { data });
  return result;
}
