import Component from './Component';
import { questionInputPropsDefault } from './interface';

export * from './interface';

// input组件的配置
export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  defaultProps: questionInputPropsDefault,
};
