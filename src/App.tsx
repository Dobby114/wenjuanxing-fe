import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
