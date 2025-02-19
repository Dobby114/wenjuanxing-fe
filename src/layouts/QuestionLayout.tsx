import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadingUserData from '../hooks/useLoadingUserData';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  const isUserDataLoaded = useLoadingUserData();
  useNavPage(isUserDataLoaded);
  return (
    <>
      <p>QuestionLayout</p>
      <div>{isUserDataLoaded && <Outlet />}</div>
    </>
  );
};

export default QuestionLayout;
