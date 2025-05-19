// 由于可能需要在很多地方用到用户数据，所以要把用户数据放在redux中管理
// 一般只需要在登陆渲染时获取一次就可以，后续数据不会有丢失的情况
// 因为数据都在redux中保存，所以只需要返回是否是已经加载过数据就可以了
import { useState, useEffect } from 'react';
import { getUserInfo } from '../services/user';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userInfo';
import { message } from 'antd';
export default function useLoadingUserData() {
  const dispatch = useDispatch();
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { userId } = useGetUserInfo();
  const { run: loadUserData } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: res => {
      const { _id: userId, username, nickname } = res;
      dispatch(loginReducer({ userId, username, nickname }));
    },
    onFinally: () => {
      setIsUserDataLoaded(true);
    },
      onError: err => {
        message.error('出错了！');
      },
  });
  useEffect(() => {
    if (userId) {
      setIsUserDataLoaded(true);
      return;
    } else {loadUserData() 
    }
  }, [userId]);
  return isUserDataLoaded;
}
