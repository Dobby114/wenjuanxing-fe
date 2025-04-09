import React from 'react';
import { FC, useState } from 'react';
import { Spin } from 'antd';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import styles from './index.module.scss';
import StaticHeader from './StaticHeader';
import LeftPanel from './LeftPanel';
import AnswerPage from './AnswerPage';
import ChartStat from './ChartStat';
const Static: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  useTitle(`数据统计 - ${title}`);
  // 状态提升
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [selectedComponentType, setSelectedComponentType] = useState<string>('');
  return loading ? (
    <Spin fullscreen />
  ) : (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <StaticHeader />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftWrapper}>
          <LeftPanel
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.centerWrapper}>
          <AnswerPage
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.rightWrapper}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </div>
    </div>
  );
};
export default Static;
