import React, { FC } from 'react';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import styles from './LeftPanel.module.scss';
import classNames from 'classnames';

interface propsType {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}
const LeftPanel: FC<propsType> = (props: propsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentsList } = useGetComponentsData();
  return (
    <div className={styles.wrapper}>
      {componentsList.map(component => {
        const { type, fe_id } = component;
        const componentClassName = classNames({
          [styles['componentWrapperDefault']]: true,
          [styles['componentWrapperSelected']]: selectedComponentId === fe_id,
        });
        const componentConfig = getComponentConfigByType(type);
        if (componentConfig) {
          const { Component } = componentConfig;
          return (
            <div
              key={component.fe_id}
              className={componentClassName}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...component.props} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default LeftPanel;
