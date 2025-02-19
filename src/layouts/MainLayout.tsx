import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import style from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadingUserData from '../hooks/useLoadingUserData';
import useNavPage from '../hooks/useNavPage';

const MainLayout: FC = () => {
  const { Header, Footer, Content } = Layout;
  const isUserDataLoaded = useLoadingUserData();
  useNavPage(isUserDataLoaded);
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
        <Content>{isUserDataLoaded && <Outlet />}</Content>
      </Layout>
      <Footer className={style.footer}>MainLayout footer</Footer>
    </Layout>
  );
};

export default MainLayout;
