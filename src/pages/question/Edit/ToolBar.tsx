import React, { FC, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
  RedoOutlined,
  UndoOutlined,
  BlockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { removeComponent } from '../../../store/components';
import { useDispatch } from 'react-redux';

// interface ToolType {
//   toolId: string;
//   text: string;
//   icon: HTMLSpanElement;
//   changedText?: string;
//   changedIcon?: HTMLSpanElement;
//   defaultState?: boolean;
//   isSwitchable?: boolean;
// }
const ToolBar: FC = () => {
  //   const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [toolData, setToolDate] = useState([
    {
      toolId: nanoid(5),
      text: '删除',
      icon: <DeleteOutlined />,
      onClick: () => {
        dispatch(removeComponent());
        console.log('删除');
      },
    },
    {
      toolId: nanoid(5),
      text: '隐藏',
      changedText: '显示',
      icon: <EyeInvisibleOutlined />,
      changedIcon: <EyeOutlined />,
      defaultState: true,
      isSwitchable: true,
    },
    {
      toolId: nanoid(5),
      text: '锁定',
      changedText: '解锁',
      icon: <LockOutlined />,
      changedIcon: <UnlockOutlined />,
      defaultState: true,
      isSwitchable: true,
    },
    { toolId: nanoid(5), text: '复制', icon: <DeleteOutlined /> },
    { toolId: nanoid(5), text: '？？', icon: <BlockOutlined /> },
    { toolId: nanoid(5), text: '上移', icon: <UpOutlined /> },
    { toolId: nanoid(5), text: '下移', icon: <DownOutlined /> },
    { toolId: nanoid(5), text: '往前一步', icon: <UndoOutlined /> },
    { toolId: nanoid(5), text: '后退一步', icon: <RedoOutlined /> },
  ]);
  function getToolIconEl(item: any) {
    const { toolId, isSwitchable } = item;
    let iconEl;
    let text;
    if (isSwitchable) {
      const { defaultState, icon, changedIcon } = item;
      iconEl = defaultState ? icon : changedIcon;
      text = defaultState ? item.text : item.changedText;
    } else {
      iconEl = item.icon;
      text = item.text;
    }
    return { toolId, iconEl, text, isSwitchable };
  }
  function handleToolClick(
    toolId: string,
    text: string,
    isSwitchable: boolean = false,
    onClick: () => void = () => {}
  ) {
    if (onClick) {
      onClick();
    }
    if (isSwitchable) {
      setToolDate(
        produce(toolData => {
          const currentTool = toolData.find(item => item.toolId === toolId);
          if (currentTool) {
            currentTool.defaultState = !currentTool.defaultState;
          }
        })
      );
    }
    // messageApi.success(text);
  }
  return (
    <>
      {/* {contextHolder} */}
      <Space size="middle">
        {toolData.map(item => {
          const { isSwitchable, toolId, onClick } = item;
          const { iconEl, text } = getToolIconEl(item);
          return (
            <div
              key={item.toolId}
              onClick={() => {
                handleToolClick(toolId, text, isSwitchable, onClick);
              }}
            >
              <Tooltip title={text}>
                <Button icon={iconEl} shape="circle"></Button>
              </Tooltip>
            </div>
          );
        })}
      </Space>
    </>
  );
};

export default ToolBar;
