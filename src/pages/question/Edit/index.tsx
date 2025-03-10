import React from 'react';
import { FC } from 'react';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/components';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { Button, Space } from 'antd';
import ToolBar from './ToolBar';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, CheckOutlined } from '@ant-design/icons';
const Edit: FC = () => {
  // const { id } = useParams();
  // 竟然真的可以实现数据函数传过来的数据都是动态变化的？！！！
  // 没有vue中那种复杂的数据类型，比如什么reactive、ref以及一些中间类型？好！
  // const { loading, data: questionData } = useRequest(() => getSingleQuestion(id as string));
  const nav = useNavigate();
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Space align="center">
            <Button
              type="link"
              onClick={() => {
                nav(-1);
              }}
              icon={<LeftOutlined />}
            >
              返回
            </Button>
            <div className={styles.questionTitle}>问卷标题</div>
          </Space>
        </div>
        <div>
          <ToolBar />
        </div>
        <div>
          <Space>
            <Button icon={<CheckOutlined />}>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
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
