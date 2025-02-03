import React from 'react';
import { FC } from 'react';
import { Spin } from 'antd';
import { useRequest } from 'ahooks';
import { getSingleQuestion } from '../../../services/questions';
import { useParams } from 'react-router-dom';

const Edit: FC = () => {
  const { id } = useParams();
  // 竟然真的可以实现数据函数传过来的数据都是动态变化的？！！！
  // 没有vue中那种复杂的数据类型，比如什么reactive、ref以及一些中间类型？好！
  const { loading, data: questionData } = useRequest(() => getSingleQuestion(id as string));
  return loading ? (
    <Spin fullscreen />
  ) : (
    <div>
      <div>编辑问卷</div>
      <div>{JSON.stringify(questionData)}</div>
    </div>
  );
};
export default Edit;
