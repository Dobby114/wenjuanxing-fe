import React, { FC } from 'react';
import { Typography } from 'antd';
import { questionParagraphPropsDefault, questionParagraphPropsType } from './interface';

const Component: FC<questionParagraphPropsType> = (props: questionParagraphPropsType) => {
  const { Paragraph } = Typography;
  const { text, isCenter } = { ...questionParagraphPropsDefault, ...props };
  return (
    <>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', color: '#646464' }}>
        {text}
      </Paragraph>
    </>
  );
};
export default Component;
