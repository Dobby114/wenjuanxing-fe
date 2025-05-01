import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CheckboxStatPropsType } from './interface';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const StatComponent: FC<CheckboxStatPropsType> = (props: CheckboxStatPropsType) => {
  const { statData: data } = props;
  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={40} height={40} data={data} style={{ fontSize: '10px' }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          cx="10%"
          dataKey="count"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        >
          {data&&data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatComponent;
