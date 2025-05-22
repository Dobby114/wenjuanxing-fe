import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import style from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';

const MainLayout: FC = () => {
  const { Header,  Content } = Layout;
  return (
    <Layout>
      <Header className={style.header}>
        <div className={style.left}>
          <Logo />
        </div>
        <div className={style.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={style.main}>
        <Content>{<Outlet />}</Content>
      </Layout>
      {/* <Footer className={style.footer}></Footer> */}
    </Layout>
  );
};

export default MainLayout;
