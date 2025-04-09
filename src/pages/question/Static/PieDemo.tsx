import React, { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieDemo: FC = () => {
  // TODO:解决文件超出样式问题 & 补全其他样式问题
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={240} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="15%"
          innerRadius={30}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name}:${(percent * 100).toFixed(1)}%`}
          style={{ fontSize: '10px' }}
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
export default PieDemo;
