import React from 'react';
import { FC } from 'react';
import { Spin } from 'antd';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import styles from './index.module.scss';
import StaticHeader from './StaticHeader';
const Static: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  useTitle(`数据统计 - ${title}`);
  return loading ? (
    <Spin fullscreen />
  ) : (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <StaticHeader />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftWrapper}>left</div>
        <div className={styles.centerWrapper}>main</div>
        <div className={styles.rightWrapper}>right</div>
      </div>
    </div>
  );
};
export default Static;
