import React, { FC } from 'react';
import { Typography, Radio } from 'antd';
import { questionRadioPropsType, questionRadioPropsDefault } from './interface';

const Component: FC<questionRadioPropsType> = (props: questionRadioPropsType) => {
  const { Paragraph } = Typography;
  const { title, options, value, isVertical } = { ...questionRadioPropsDefault, ...props };
  const verticalStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };
  return (
    <>
      <Paragraph style={{ fontWeight: 700 }}>{title}</Paragraph>
      <Radio.Group
        style={isVertical ? verticalStyle : {}}
        options={options}
        value={value}
      ></Radio.Group>
    </>
  );
};

export default Component;
