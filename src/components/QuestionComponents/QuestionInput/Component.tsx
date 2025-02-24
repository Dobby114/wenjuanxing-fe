import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { questionInputPropsDefault, questionInputPropsType } from './interface';

const QuestionInput: FC<Partial<questionInputPropsType>> = (
  props: Partial<questionInputPropsType>
) => {
  const { Paragraph } = Typography;
  const { title, placeholder } = { ...questionInputPropsDefault, ...props };
  return (
    <>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
