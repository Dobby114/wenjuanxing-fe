import Component from './Component';
import { questionRadioPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '单选输入框',
  type: 'questionRadio',
  Component: Component,
  defaultProps: questionRadioPropsDefault,
  PropComponent: PropComponent,
};
