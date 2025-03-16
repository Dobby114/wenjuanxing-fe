import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { componentInfoType, changeSelectedId } from '../../../store/components';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import useCanvasKeyPressBind from '../../../hooks/useCanvasKeyPressBind';

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
  return (
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
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => {
                handleChangeSelect(e, fe_id);
              }}
            >
              <div className={styles.component}>{genComponent(componentItem)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default EditCanvas;
