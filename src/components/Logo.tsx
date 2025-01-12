import React, { FC } from 'react';
import { Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const Logo: FC = () => {
  const { Title } = Typography;
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <Space>
          <Title>
            <EditOutlined />
          </Title>
          <Title>星星问卷</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
