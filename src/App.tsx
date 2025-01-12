import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import MyQuestionList from './pages/manage/MyQuestionList';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
// import '@ant-design/v5-patch-for-react-19';

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
