import Component from './Component';
import { questionTitlePropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

// title组件的配置
export default {
  title: '标题',
  type: 'questionTitle', //和后端统一好
  Component,
  PropComponent,
  defaultProps: questionTitlePropsDefault,
};
