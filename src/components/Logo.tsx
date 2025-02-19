import React, { FC } from 'react';
import { Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { MANAGER_INDEX_PATHNAME } from '../router';

const Logo: FC = () => {
  const { Title } = Typography;
  const { userId } = useGetUserInfo();
  return (
    <div className={styles.container}>
      <Link to={userId ? MANAGER_INDEX_PATHNAME : '/'}>
        <Space>
          <Title>
            <EditOutlined />
          </Title>
          <Title>造梦问卷</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
