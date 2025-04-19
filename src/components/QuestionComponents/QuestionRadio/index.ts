import Component from './Component';
import { questionRadioPropsDefault } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

export * from './interface';

const config = {
  title: '单选输入框',
  type: 'questionRadio',
  Component,
  defaultProps: questionRadioPropsDefault,
  PropComponent,
  StatComponent,
};


export default  config