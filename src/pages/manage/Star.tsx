import React from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { Empty } from 'antd';
import ListSearch from '../../components/ListSearch';
const StarList: FC = () => {
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
  return (
    <div className={style.container}>
      {/* <div className={style.header}>星星问卷</div> */}
      <div className={style.content}>
        <div className={style.title}>
          <div>星标问卷</div>
          <div>
            <ListSearch />
          </div>
        </div>
        {/* 问卷列表 */}
        {mockQuestionData.length > 0 ? (
          mockQuestionData.map(item => {
            if (item.isStar) {
              return <QuestionList key={item._id} {...item}></QuestionList>;
            }
          })
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={style.footer}>分页</div>
    </div>
  );
};

export default StarList;
