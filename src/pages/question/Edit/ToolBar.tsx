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
  ArrowUpOutlined,
  ArrowDownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import {
  removeComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  changeComponentIndex,
} from '../../../store/components';
import { useDispatch } from 'react-redux';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const ToolBar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentsList } = useGetComponentsData();
  const { isHidden, isLocked } = selectedComponent || {};
  const dispatch = useDispatch();
  const selectedIndex = componentsList.findIndex(item => item.fe_id === selectedId);
  const length = componentsList.length;
  function handleMoveUp() {
    if (selectedIndex === 0) return;
    dispatch(changeComponentIndex({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }
  function handleMoveDown() {
    if (selectedIndex === length - 1) return;
    dispatch(changeComponentIndex({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }
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
              dispatch(toggleComponentHidden({ fe_id: selectedId }));
            }}
          ></Button>
        </Tooltip>
        <Tooltip title={isLocked ? '解锁' : '锁定'}>
          <Button
            icon={isLocked ? <UnlockOutlined /> : <LockOutlined />}
            type={isLocked ? 'primary' : 'default'}
            onClick={() => {
              dispatch(toggleComponentLocked({ fe_id: selectedId }));
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
        <Tooltip title="上移">
          <Button
            icon={<ArrowUpOutlined />}
            onClick={handleMoveUp}
            disabled={selectedIndex === 0}
          ></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button
            icon={<ArrowDownOutlined />}
            onClick={handleMoveDown}
            disabled={selectedIndex === length - 1}
          ></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button
            icon={<UndoOutlined />}
            onClick={() => {
              dispatch(UndoActionCreators.undo());
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button
            icon={<RedoOutlined />}
            onClick={() => {
              dispatch(UndoActionCreators.redo());
            }}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default ToolBar;
