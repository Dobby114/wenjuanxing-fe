import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { removeUserToken } from '../utils/user-tokens';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../store/userInfo';
const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { userId, username } = useGetUserInfo();
  function handleLogout() {
    removeUserToken();
    dispatch(logoutReducer());
    nav(LOGIN_PATHNAME);
  }
  return userId ? (
    <Space align="baseline">
      <span style={{ color: 'white' }}>
        <UserOutlined />
        {username}
      </span>
      <Button type="link" onClick={handleLogout}>
        退出
      </Button>
    </Space>
  ) : (
    <div>
      <Link to={LOGIN_PATHNAME}>登陆/注册</Link>
    </div>
  );
};

export default UserInfo;
