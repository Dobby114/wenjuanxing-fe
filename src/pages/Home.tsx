import React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Typography } from 'antd';
import styles from './Home.module.scss';
import { LOGIN_PATHNAME } from '../router';
import { RightOutlined } from '@ant-design/icons';
const Home: FC = () => {
  const navigate = useNavigate();
  const { Title, Paragraph } = Typography;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <Title>让问卷设计更简单，让数据洞察更清晰！</Title>
            <Paragraph style={{fontSize:'18px'}}>「造梦问卷」提供直观的拖拽设计和丰富模板，助您快速创建专业问卷，轻松收集数据。</Paragraph>
            {/* <Paragraph>实时统计和可视化分析让您精准把握反馈，高效决策！</Paragraph> */}
            <div>
              <Button
                type="primary"
                onClick={() => {
                  navigate(LOGIN_PATHNAME);
                }}
                size='large'
                icon={<RightOutlined />}
                iconPosition='end'
                ghost={false}
                style={{backgroundColor:'#001628'}}
              >
                开始使用
              </Button>
            </div>
          </div>
          <div className={styles.icon}>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
