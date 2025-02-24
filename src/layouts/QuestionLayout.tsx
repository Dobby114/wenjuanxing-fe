import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadingUserData from '../hooks/useLoadingUserData';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  const isUserDataLoaded = useLoadingUserData();
  useNavPage(isUserDataLoaded);
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div>{isUserDataLoaded && <Outlet />}</div>
    </div>
  );
};

export default QuestionLayout;
