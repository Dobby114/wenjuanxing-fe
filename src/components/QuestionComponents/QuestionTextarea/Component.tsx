import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { questionTextareaPropsDefault, questionTextareaPropsType } from './interface';

const QuestionTextarea: FC<Partial<questionTextareaPropsType>> = (
  props: Partial<questionTextareaPropsType>
) => {
  const { Paragraph } = Typography;
  const { title, placeholder } = { ...questionTextareaPropsDefault, ...props };
  return (
    <>
      <Paragraph style={{ fontWeight: 700 }}>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </>
  );
};

export default QuestionTextarea;
