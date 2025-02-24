import React, { FC } from 'react';
import { Typography } from 'antd';
import { questionTitlePropsDefault, questionTitlePropsType } from './interface';
const QuestionTitle: FC<questionTitlePropsType> = (props: questionTitlePropsType) => {
  const { Title } = Typography;
  const { text, level, isCenter } = { ...questionTitlePropsDefault, ...props };

  return (
    <>
      <Title level={level} style={{ textAlign: isCenter ? 'center' : 'start' }}>
        {text}
      </Title>
    </>
  );
};

export default QuestionTitle;
