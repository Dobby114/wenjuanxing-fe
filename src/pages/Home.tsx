import React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { Typography } from 'antd';
import styles from './Home.module.scss';
import { MANAGER_INDEX_PATHNAME } from '../router';
const Home: FC = () => {
  const navigate = useNavigate();
  const { Title, Paragraph } = Typography;
  // function handleNavigate(path: string) {
  //   // nav(path);
  //   // 传递参数
  //   // nav({
  //   //   pathname: path,
  //   //   search: 'b=100',
  //   // });
  // }
  return (
    <div className={styles.container}>
      <Title>问卷调查｜ 在线投票</Title>
      <Paragraph>让我们一起让这个世界变得更加美好吧！！！！</Paragraph>
      <div>
        <Button
          type="primary"
          onClick={() => {
            message.success('跳转成功');
            navigate(MANAGER_INDEX_PATHNAME);
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
};
export default Home;
