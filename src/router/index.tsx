import {lazy} from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import MyQuestionList from '../pages/manage/MyQuestionList';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
// import Edit from '../pages/question/Edit';
// import Static from '../pages/question/Static';

const Edit = lazy(()=>import(/*webpackChunkName: "editPage"*/ '../pages/question/Edit'))
const Static = lazy(()=>import(/*webpackChunkName: "staticPage"*/ '../pages/question/Static'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <MyQuestionList />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 404 路由配置，都写在最后（兜底）
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'static/:id', // statistic 统计
        element: <Static />,
      },
    ],
  },
]);

export default router;

// 常用的route常量

export const REGISTER_PATHNAME = '/register';
export const LOGIN_PATHNAME = '/login';
export const HOME_PATHNAME = '/';
export const MANAGER_INDEX_PATHNAME = '/manage/list';
