import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  //   UpOutlined,
  //   DownOutlined,
  //   RedoOutlined,
  //   UndoOutlined,
  //   BlockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {
  removeComponent,
  toggleComponentHidden,
  toggleComponentLocked,
} from '../../../store/components';
import { useDispatch } from 'react-redux';
import useGetComponentsData from '../../../hooks/useGetComponentsData';

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
  const { selectedComponent } = useGetComponentsData();
  const { isHidden, isLocked } = selectedComponent || {};
  const dispatch = useDispatch();

  return (
    <>
      <Space size="middle">
        <Tooltip title="删除">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              dispatch(removeComponent());
            }}
          ></Button>
        </Tooltip>
        <Tooltip title={isHidden ? '显示' : '隐藏'}>
          <Button
            icon={isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => {
              dispatch(toggleComponentHidden());
            }}
          ></Button>
        </Tooltip>
        <Tooltip title={isLocked ? '解锁' : '锁定'}>
          <Button
            icon={isLocked ? <UnlockOutlined /> : <LockOutlined />}
            type={isLocked ? 'primary' : 'default'}
            onClick={() => {
              dispatch(toggleComponentLocked());
            }}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default ToolBar;
