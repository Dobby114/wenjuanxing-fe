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

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const BarDemo: FC = () => {
  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={40} height={40} data={data} style={{ fontSize: '10px' }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          cx="10%"
          dataKey="uv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarDemo;
