import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { useRequest } from 'ahooks';
import { getUserInfo } from '../services/user';
import { Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { removeUserToken } from '../utils/user-tokens';
const UserInfo: FC = () => {
  const nav = useNavigate();
  const { data = {} } = useRequest(getUserInfo);
  const { userId = '', username = '' } = data;
  function handleLogout() {
    removeUserToken();
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
