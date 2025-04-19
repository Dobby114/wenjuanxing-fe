import Component from './Component';
import { questionTextareaPropsDefault } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

// questionTextarea组件的配置
const config = {
  title: '多行输入框',
  type: 'questionTextarea',
  Component, //画布显示的组件
  PropComponent, //组件修改属性
  defaultProps: questionTextareaPropsDefault,
};

export default config
