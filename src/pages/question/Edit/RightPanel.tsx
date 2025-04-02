import React, { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import Props from './Props';
import PageSetting from './PageSetting';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/components';

enum TAB_KEYS {
  PROPS_KEY = 'props',
  SETTING_KEY = 'pageSettings',
}
const RightPanel: FC = () => {
  const dispatch = useDispatch();
  const { selectedId } = useGetComponentsData();
  const [activeTab, setActiveTab] = useState(TAB_KEYS.PROPS_KEY as string);
  useEffect(() => {
    if (selectedId) {
      setActiveTab(TAB_KEYS.PROPS_KEY);
    } else {
      setActiveTab(TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);
  const tabItems = [
    { key: TAB_KEYS.PROPS_KEY, label: '属性', icon: <ProfileOutlined />, children: <Props /> },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ];
  return (
    <Tabs
      activeKey={activeTab}
      items={tabItems}
      onTabClick={(key: string) => {
        if (key === TAB_KEYS.SETTING_KEY) {
          dispatch(changeSelectedId({ selectedId: '' }));
        }
        setActiveTab(key);
      }}
    ></Tabs>
  );
};

export default RightPanel;
