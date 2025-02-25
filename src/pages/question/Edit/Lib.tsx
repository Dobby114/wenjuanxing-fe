import React, { FC } from 'react';
import { Typography } from 'antd';
import { componentConfigType, componentGroupConfig } from '../../../components/QuestionComponents';
import styles from './Lib.module.scss';

function genComponent(componentConfig: componentConfigType) {
  const { Component } = componentConfig;
  return (
    <div className={styles.component}>
      <Component />
    </div>
  );
}
const Lib: FC = () => {
  return (
    <div>
      {componentGroupConfig.map((item, index) => {
        const { Title } = Typography;
        const { groupId, groupName, componentList } = item;
        return (
          <div key={groupId}>
            <Title level={5} style={{ marginTop: index > 0 ? '20px' : 0 }}>
              {groupName}
            </Title>
            <div className={styles.wrapper}>
              {componentList.map(item => genComponent(item as componentConfigType))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lib;
