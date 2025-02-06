import React from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { Empty, Spin } from 'antd';
import ListSearch from '../../components/ListSearch';
import { useLoadQuestionList } from '../../hooks/useLoadQuestionList';
import ListPage from '../../components/ListPage';
const StarList: FC = () => {
  const { data, loading } = useLoadQuestionList({ isStar: true });
  const mockQuestionData = data?.list || [];
  const total = data?.total || 0;
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <div>星标问卷</div>
          <div>
            <ListSearch loading={loading} />
          </div>
        </div>
        {/* 问卷列表 */}
        <div className={style.body}>
          {loading && <Spin tip="加载中">{<div style={{ padding: '50px' }}></div>}</Spin>}
          {!loading && mockQuestionData.length > 0 && (
            <div style={{ height: '100%' }}>
              {mockQuestionData.map((item: any) => {
                return <QuestionList key={item._id} {...item}></QuestionList>;
              })}
            </div>
          )}
          {!loading && mockQuestionData.length <= 0 && <Empty description="暂无数据" />}
        </div>
        <div className={style.footer}>
          {!loading && mockQuestionData.length > 0 && <ListPage total={total} />}
        </div>
      </div>
      {/* <div className={style.footer}>
        <ListPage />
      </div> */}
    </div>
  );
};

export default StarList;
