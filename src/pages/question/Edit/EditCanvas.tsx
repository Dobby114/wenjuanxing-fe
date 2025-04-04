import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import {
  componentInfoType,
  changeSelectedId,
  changeComponentIndex,
} from '../../../store/components';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import useCanvasKeyPressBind from '../../../hooks/useCanvasKeyPressBind';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';

interface propsType {
  loading: boolean;
}
function genComponent(componentItem: componentInfoType) {
  const { type, props } = componentItem;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig) {
    const { Component } = componentConfig;
    return <Component {...props} />;
  } else {
    return null;
  }
}

const EditCanvas: FC<propsType> = ({ loading }) => {
  useCanvasKeyPressBind();
  const dispatch = useDispatch();
  const { componentsList, selectedId } = useGetComponentsData();
  function handleChangeSelect(event: MouseEvent, selectedId: string) {
    // 阻止事件冒泡到父组件，触发父组件上的事件
    event.stopPropagation();
    dispatch(changeSelectedId({ selectedId }));
  }
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    );
  }
  // 组件拖拽需要需要id属性
  const componentListWithId = componentsList.map(item => ({ id: item.fe_id, ...item }));
  // 拖拽组件的onDragEnd事件
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(changeComponentIndex({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentsList
          .filter(item => !item.isHidden)
          .map(componentItem => {
            const { fe_id, isLocked } = componentItem;
            // 拼接画板上每个组件样式
            const wrapperClassName = classNames({
              [styles['component-wrapper']]: true,
              [styles['selected']]: selectedId === fe_id,
              [styles['locked']]: isLocked,
            });
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    handleChangeSelect(e, fe_id);
                  }}
                >
                  <div className={styles.component}>{genComponent(componentItem)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
