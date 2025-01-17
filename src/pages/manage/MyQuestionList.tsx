import React from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Empty } from 'antd';
const MyQuestionList: FC = () => {
  const mockQuestionData = [
    {
      _id: 0,
      title: '问卷一',
      isPublished: false,
      isStar: false,
      answerCount: 8,
      createTime: '12月22日 16:28',
    },
    {
      _id: 1,
      title: '问卷二',
      isPublished: true,
      isStar: false,
      answerCount: 8,
      createTime: '12月21日 16:28',
    },
    {
      _id: 2,
      title: '问卷三',
      isPublished: false,
      isStar: true,
      answerCount: 8,
      createTime: '12月20日 16:28',
    },
  ];
  const [searchParams] = useSearchParams();
  console.log('搜索参数', searchParams.get('keywords'));
  return (
    <div className={style.container}>
      {/* <div className={style.header}>星星问卷</div> */}
      <div className={style.content}>
        <div className={style.title}>我的问卷</div>
        {/* 问卷列表 */}
        {mockQuestionData.length > 0 ? (
          mockQuestionData.map(item => {
            return <QuestionList key={item._id} {...item}></QuestionList>;
          })
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={style.footer}>loader more... 上滑加载更多...</div>
    </div>
  );
};

export default MyQuestionList;
