// paragraph 组件的配置
import Component from './Component';
import { questionParagraphPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '标题',
  type: 'questionParagraph', //和后端统一好
  Component,
  PropComponent,
  defaultProps: questionParagraphPropsDefault,
};
