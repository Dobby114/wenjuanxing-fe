// 用于控制登陆和未登陆下的页面跳转
// 登陆状态访问登陆网址自动跳转我的问卷页面
import useGetUserInfo from './useGetUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  MANAGER_INDEX_PATHNAME,
  LOGIN_PATHNAME,
  REGISTER_PATHNAME,
  HOME_PATHNAME,
} from '../router';

export default function useNavPage(isUserInfoLoad: boolean) {
  const nav = useNavigate();
  const { userId } = useGetUserInfo();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isUserInfoLoad) {
      return;
    } else if (userId) {
      console.log(userId);
      //登陆状态，处理访问登陆页或者注册页的情况
      if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
        nav(MANAGER_INDEX_PATHNAME);
      }
    } else {
      // 未登陆状态,除了首页、登陆页和注册页面，其他都不能访问
      if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
        nav(pathname);
      }
    }
  }, [isUserInfoLoad, pathname, userId]);
}
