import React, { FC } from 'react';
import { Typography } from 'antd';
import { questionParagraphPropsDefault, questionParagraphPropsType } from './interface';

const Component: FC<Partial<questionParagraphPropsType>> = (props: Partial<questionParagraphPropsType>) => {
  const { Paragraph } = Typography;
  const { text, isCenter } = { ...questionParagraphPropsDefault, ...props };
  const textList = text.split('\n');
  return (
    <>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
        {textList.map((t, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {t}
            </span>
          );
        })}
      </Paragraph>
    </>
  );
};
export default Component;
