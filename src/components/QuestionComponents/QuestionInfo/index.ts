import Component from './Component';
import { questionInfoPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

// questionInfo组件的配置
const config= {
  title: '标题描述',
  type: 'questionInfo',
  Component, //画布显示的组件
  PropComponent, //组件修改属性
  defaultProps: questionInfoPropsDefault,
};

export default config
