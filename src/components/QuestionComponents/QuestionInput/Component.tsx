import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { questionInputPropsDefault, questionInputPropsType } from './interface';

const QuestionInput: FC<Partial<questionInputPropsType>> = (
  props: Partial<questionInputPropsType>
) => {
  const { Title } = Typography;
  const { title, placeholder } = { ...questionInputPropsDefault, ...props };
  return (
    <>
      <Title level={5}>{title}</Title>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
