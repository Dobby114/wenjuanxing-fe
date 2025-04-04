import React from 'react';
import { FC } from 'react';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/components';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';

const Edit: FC = () => {
  // const { id } = useParams();
  // 竟然真的可以实现数据函数传过来的数据都是动态变化的？！！！
  // 没有vue中那种复杂的数据类型，比如什么reactive、ref以及一些中间类型？好！
  // const { loading, data: questionData } = useRequest(() => getSingleQuestion(id as string));
  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();
  function handleClearSelect() {
    dispatch(changeSelectedId({ selectedId: '' }));
  }

  {
    /* 左侧组件库展示的数据从写好的组中拿的，都是默认数据，不会变
    画板和右侧组件数据拿的redux存储的componentList，包含后端数据库的和新修改的组件数据
    */
  }
  // React可以在一个文件中将dom拆分
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles.content}>
        <div className={styles.left}>
          <LeftPanel />
        </div>
        <div className={styles.main} onClick={handleClearSelect}>
          <div className={styles.wrapper}>
            <div className={styles.title}>1111测试</div>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};
export default Edit;
