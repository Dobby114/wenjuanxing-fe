import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  //   UpOutlined,
  //   DownOutlined,
  //   RedoOutlined,
  //   UndoOutlined,
  BlockOutlined,
  CopyOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {
  removeComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/components';
import { useDispatch } from 'react-redux';
import useGetComponentsData from '../../../hooks/useGetComponentsData';

const ToolBar: FC = () => {
  const { selectedComponent, copiedComponent } = useGetComponentsData();
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
        <Tooltip title="复制">
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              dispatch(copySelectedComponent());
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            icon={<BlockOutlined />}
            onClick={() => {
              dispatch(pasteCopiedComponent());
            }}
            disabled={!copiedComponent}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default ToolBar;
