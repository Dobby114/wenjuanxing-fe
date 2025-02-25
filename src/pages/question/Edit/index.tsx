import React from 'react';
import { FC } from 'react';
// import { Spin } from 'antd';
// import { useRequest } from 'ahooks';
// import { getSingleQuestion } from '../../../services/questions';
// import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/components';
import LeftPanel from './LeftPanel';
const Edit: FC = () => {
  // const { id } = useParams();
  // 竟然真的可以实现数据函数传过来的数据都是动态变化的？！！！
  // 没有vue中那种复杂的数据类型，比如什么reactive、ref以及一些中间类型？好！
  // const { loading, data: questionData } = useRequest(() => getSingleQuestion(id as string));
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();
  function handleClearSelect() {
    dispatch(changeSelectedId({ selectedId: '' }));
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>编辑问卷</div>
      <div className={styles.content}>
        <div className={styles.left}>
          <LeftPanel />
        </div>
        <div className={styles.main} onClick={handleClearSelect}>
          <div className={styles.wrapper}>
            <div className={styles.title}>1111测试</div>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '1200px' }}>
                <EditCanvas loading={loading}></EditCanvas>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>右</div>
      </div>
    </div>
  );
};
export default Edit;
