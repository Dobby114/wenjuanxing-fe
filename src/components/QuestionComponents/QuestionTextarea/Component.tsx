import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { questionTextareaPropsDefault, questionTextareaPropsType } from './interface';

const QuestionTextarea: FC<Partial<questionTextareaPropsType>> = (
  props: Partial<questionTextareaPropsType>
) => {
  const { Title } = Typography;
  const { title, placeholder } = { ...questionTextareaPropsDefault, ...props };
  return (
    <>
      <Title level={5}>{title}</Title>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </>
  );
};

export default QuestionTextarea;
