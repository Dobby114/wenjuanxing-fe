import React, { FC } from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Lib from './Lib';
import Layers from './Layers';

const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: '组件库',
      icon: <AppstoreOutlined />,
      children: <Lib />,
    },
    { key: 'layer', label: '图层', icon: <BarsOutlined />, children: <Layers /> },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />;
};

export default LeftPanel;
