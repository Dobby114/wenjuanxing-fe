import React, { ChangeEvent, FC, useState, useRef } from 'react';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import styles from './Layers.module.scss';
import { Button, Space, message, Input, InputRef } from 'antd';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentHidden,
  toggleComponentLocked,
  changeComponentIndex,
} from '../../../store/components';
import classNames from 'classnames';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';
const Layers: FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<InputRef>(null);
  //   记录正在改变的titleId
  const [changingTitleId, setChangingTitleId] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { componentList, selectedId } = useGetComponentsData();
  function handleTextSelect(newSelectedId: string) {
    // 不能选中hidden组件
    const newSelectedComponent = componentList.find(item => item.fe_id === newSelectedId);
    console.log(newSelectedId, selectedId, newSelectedComponent);
    if (newSelectedComponent && newSelectedComponent.isHidden) {
      messageApi.error('无法选中已隐藏图层！');
    } else if (newSelectedId !== selectedId) {
      dispatch(changeSelectedId({ selectedId: newSelectedId }));
      setChangingTitleId('');
    } else {
      setChangingTitleId(newSelectedId);
    }
  }
  //   修改组件title
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!selectedId) return;
    const value = e.target.value.trim();
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle: value }));
  }
  // 组件拖拽需要需要id属性
  const componentListWithId = componentList.map(item => ({ id: item.fe_id, ...item }));
  // 拖拽组件的onDragEnd事件
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(changeComponentIndex({ oldIndex, newIndex }));
  }
  return (
    <>
      {contextHolder}
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList.map(item => {
          const { title, fe_id, isHidden, isLocked } = item;
          const titleStyle = classNames({
            [styles.titleDefault]: true,
            [styles.titleSelected]: fe_id === selectedId,
          });
          return (
            <SortableItem id={fe_id} key={fe_id}>
              <div className={styles.wrapper}>
                <div className={titleStyle} onClick={() => handleTextSelect(fe_id)}>
                  {fe_id === changingTitleId ? (
                    <Input
                      ref={inputRef}
                      value={title}
                      onPressEnter={() => setChangingTitleId('')}
                      onBlur={() => setChangingTitleId('')}
                      onChange={value => handleTitleChange(value)}
                    />
                  ) : (
                    title
                  )}
                </div>
                <Space align="baseline">
                  {
                    <Button
                      shape="circle"
                      className={isHidden ? '' : styles.iconBtnDefault}
                      icon={<EyeInvisibleOutlined />}
                      type={isHidden ? 'primary' : 'text'}
                      onClick={() => {
                        dispatch(toggleComponentHidden({ fe_id }));
                      }}
                    />
                  }
                  <Button
                    shape="circle"
                    className={isLocked ? '' : styles.iconBtnDefault}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => {
                      dispatch(toggleComponentLocked({ fe_id }));
                    }}
                  />
                </Space>
              </div>
            </SortableItem>
          );
        })}
      </SortableContainer>
    </>
  );
};
export default Layers;
