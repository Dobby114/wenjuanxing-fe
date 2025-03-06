import Component from './Component';
import { questionInputPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

// input组件的配置
export default {
  title: '输入框',
  type: 'questionInput',
  Component, //画布显示的组件
  PropComponent, //组件修改属性
  defaultProps: questionInputPropsDefault,
};
