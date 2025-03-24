import React, { FC } from 'react';
import { Typography } from 'antd';
import { componentConfigType, componentGroupConfig } from '../../../components/QuestionComponents';
import styles from './Lib.module.scss';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/components';
import { nanoid } from '@reduxjs/toolkit';

const Lib: FC = () => {
  const dispatch = useDispatch();

  function handleComponentClick(componentConfig: componentConfigType) {
    const { type, title, defaultProps } = componentConfig;
    dispatch(
      addComponent({
        fe_id: nanoid(5), //前端生成的id，没办法生成符合后端数据库格式的id，所以用fe_id，前端可以直接控制
        type,
        title,
        props: defaultProps,
        isHidden: false,
        isLocked: false,
      })
    );
  }
  function genComponent(componentConfig: componentConfigType) {
    const { Component, title } = componentConfig;
    return (
      <div
        className={styles.groupWrapper}
        onClick={() => handleComponentClick(componentConfig)}
        key={title}
      >
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.libContainer}>
      <div className={styles.wrapper}>
        {componentGroupConfig.map((item, index) => {
          const { Title } = Typography;
          const { groupId, groupName, componentList } = item;
          return (
            <div key={groupId}>
              <Title level={5} style={{ marginTop: index > 0 ? '20px' : 0 }}>
                {groupName}
              </Title>
              <div>{componentList.map(item => genComponent(item as componentConfigType))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lib;
