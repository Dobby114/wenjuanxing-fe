import Component from './Component';
import { questionTitlePropsDefault } from './interface';

export * from './interface';

// title组件的配置
export default {
  title: '标题',
  type: 'questionTitle', //和后端统一好
  Component,
  defaultProps: questionTitlePropsDefault,
};
