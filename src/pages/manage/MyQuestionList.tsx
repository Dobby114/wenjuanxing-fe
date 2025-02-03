import React from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { Empty, Spin } from 'antd';
import ListSearch from '../../components/ListSearch';
import { useRequest } from 'ahooks';
import { getQuestionList } from '../../services/questions';
const MyQuestionList: FC = () => {
  // const mockQuestionData = [
  //   {
  //     _id: 0,
  //     title: '问卷一',
  //     isPublished: false,
  //     isStar: false,
  //     answerCount: 8,
  //     createTime: '12月22日 16:28',
  //   },
  //   {
  //     _id: 1,
  //     title: '问卷二',
  //     isPublished: true,
  //     isStar: false,
  //     answerCount: 8,
  //     createTime: '12月21日 16:28',
  //   },
  //   {
  //     _id: 2,
  //     title: '问卷三',
  //     isPublished: false,
  //     isStar: true,
  //     answerCount: 8,
  //     createTime: '12月20日 16:28',
  //   },
  // ];
  const { data, loading } = useRequest(getQuestionList);
  const mockQuestionData = data?.list || [];
  // const total = data?.total || 0;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <div>我的问卷</div>
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
      <div className={style.footer}>loader more... 上滑加载更多...</div>
    </div>
  );
};

export default MyQuestionList;
