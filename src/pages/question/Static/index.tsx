import React from 'react';
import { FC } from 'react';
import { Spin } from 'antd';
import { useRequest } from 'ahooks';
import { getSingleQuestion } from '../../../services/questions';
import { useParams } from 'react-router-dom';
const Static: FC = () => {
  const { id } = useParams();
  const { loading, data: questionData } = useRequest(() => getSingleQuestion(id as string));
  return loading ? (
    <Spin fullscreen />
  ) : (
    <div>
      <div>数据统计</div>
      <div>{JSON.stringify(questionData)}</div>
    </div>
  );
};
export default Static;
