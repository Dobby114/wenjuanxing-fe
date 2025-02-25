import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { componentInfoType } from '../../../store/components';

interface propsType {
  loading: boolean;
}
function getComponent(componentItem: componentInfoType) {
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
  const { componentsList } = useGetComponentsData();
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
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(componentItem)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
