import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { componentInfoType, changeSelectedId } from '../../../store/components';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

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
      {componentsList.map(componentItem => {
        const { fe_id } = componentItem;
        const wrapperClassName = classNames({
          [styles['component-wrapper']]: true,
          [styles['selected']]: selectedId === fe_id,
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
