import React, { FC } from 'react';
import { Typography } from 'antd';
import { questionInfoPropsType, questionInfoPropsDefault } from './interface';

const { Title, Paragraph } = Typography;
const Component: FC<Partial<questionInfoPropsType>> = (props: Partial<questionInfoPropsType>) => {
  const { title, desc = '', isCenter } = { ...questionInfoPropsDefault, ...props };
  const descList = desc.split('\n');
  return (
    <div style={{ textAlign: isCenter ? 'center' : 'start' }}>
      <Title level={1}>{title}</Title>
      <Paragraph>
        {descList.map((t, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {t}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};
export default Component;
