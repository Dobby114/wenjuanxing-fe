import React, { FC } from 'react';
// import PieDemo from './PieDemo';
import BarDemo from './BarDemo';
import { Typography } from 'antd';

interface propsType {
  selectedComponentId: string;
  selectedComponentType: string;
}
const ChartStat: FC<propsType> = (props: propsType) => {
  const { Title } = Typography;
  const { selectedComponentId, selectedComponentType } = props;
  console.log('ChartStat', selectedComponentId, selectedComponentType);
  return (
    <>
      <Title level={3}>图表统计</Title>
      {/* <PieDemo /> */}
      <BarDemo />
    </>
  );
};

export default ChartStat;
