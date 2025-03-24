import Component from './Component';
import { questionInfoPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

// questionInfo组件的配置
export default {
  title: '输入框',
  type: 'questionInfo',
  Component, //画布显示的组件
  PropComponent, //组件修改属性
  defaultProps: questionInfoPropsDefault,
};
