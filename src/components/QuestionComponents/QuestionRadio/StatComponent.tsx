import React, { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { radioStatPropsType } from './interface';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatComponent: FC<radioStatPropsType> = (props: radioStatPropsType) => {
  // TODO:解决文件超出样式问题 & 补全其他样式问题
  const { statData: data } = props;
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={240} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="25%"
          innerRadius={40}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="count"
          label={({ name, percent }) => `${name}:${(percent * 100).toFixed(1)}%`}
          style={{ fontSize: '16px' }}
          labelLine
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default StatComponent;
