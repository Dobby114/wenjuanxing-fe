import React from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { Empty, Spin } from 'antd';
import ListSearch from '../../components/ListSearch';
import { useLoadQuestionList } from '../../hooks/useLoadQuestionList';
const StarList: FC = () => {
  const { data, loading } = useLoadQuestionList({ isStar: true });
  const mockQuestionData = data?.list || [];
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <div>星标问卷</div>
          <div>
            <ListSearch />
          </div>
        </div>
        {/* 问卷列表 */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />{' '}
          </div>
        )}
        {!loading &&
          mockQuestionData.length > 0 &&
          mockQuestionData.map((item: any) => {
            return <QuestionList key={item._id} {...item}></QuestionList>;
          })}
        {!loading && mockQuestionData.length <= 0 && <Empty description="暂无数据" />}
      </div>
      <div className={style.footer}>分页</div>
    </div>
  );
};

export default StarList;
