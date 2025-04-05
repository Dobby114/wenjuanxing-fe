import React, { FC } from 'react';
import { Space, Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import styles from './StaticHeader.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const StaticHeader: FC = () => {
  const { Title } = Typography;
  const { title } = useGetPageInfo();
  const nav = useNavigate();
  const { id } = useParams();
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Space align="baseline">
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title level={4} style={{ fontWeight: 700 }}>
            {title}
          </Title>
        </Space>
      </div>
      <div className={styles.center}>中间</div>
      <div className={styles.right}>
        <Button
          type="primary"
          onClick={() => {
            nav(`/question/edit/${id}`);
          }}
        >
          编辑问卷
        </Button>
      </div>
    </div>
  );
};

export default StaticHeader;
