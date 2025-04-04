import React from 'react';
import { FC } from 'react';
import { Spin } from 'antd';
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
const Static: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  useTitle(`数据统计 - ${title}`);
  return loading ? (
    <Spin fullscreen />
  ) : (
    <div>
      <div>数据统计</div>
    </div>
  );
};
export default Static;
