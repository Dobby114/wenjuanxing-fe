import React, { FC } from 'react';
import { Typography, Checkbox, Space } from 'antd';
import { questionCheckboxPropsType, questionCheckboxPropsDefault } from './interface';

const Component: FC<Partial<questionCheckboxPropsType>> = (props: Partial<questionCheckboxPropsType>) => {
  const { Paragraph } = Typography;
  const { title, options, isVertical } = {
    ...questionCheckboxPropsDefault,
    ...props,
  };

  return (
    <>
      <Paragraph style={{ fontWeight: 700 }}>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {options.map(opt => {
          const { value, label, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </>
  );
};

export default Component;
