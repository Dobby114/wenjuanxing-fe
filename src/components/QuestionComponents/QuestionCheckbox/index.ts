import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { questionCheckboxPropsDefault } from './interface';
export * from './interface';

export default {
  title: '多项选择框',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: questionCheckboxPropsDefault,
  StatComponent,
};
