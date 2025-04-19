/**
 * @description 问卷 Input组件
 * @author 廖毅慧
 */

import Component from './Component';
import { questionInputPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

// input组件的配置
const config = {
  title: '输入框',
  type: 'questionInput',
  Component, //画布显示的组件
  PropComponent, //组件修改属性
  defaultProps: questionInputPropsDefault,
};

export default config
