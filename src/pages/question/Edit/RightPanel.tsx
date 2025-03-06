import React, { FC } from 'react';
import { Tabs } from 'antd';
import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import Props from './Props';

const RightPanel: FC = () => {
  const tabItems = [
    { key: 'props', label: '属性', icon: <ProfileOutlined />, children: <Props /> },
    { key: 'pageSettings', label: '页面设置', icon: <SettingOutlined /> },
  ];
  return <Tabs items={tabItems}></Tabs>;
};

export default RightPanel;
