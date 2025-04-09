import type { FC } from 'react';
import questionTitleConfig, { questionTitlePropsType } from './QuestionTitle';
import questionInputConfig, { questionInputPropsType } from './QuestionInput';
import questionParagraphConfig, { questionParagraphPropsType } from './QuestionParagraph';
import questionInfoConfig, { questionInfoPropsType } from './QuestionInfo';
import questionTextareaConfig, { questionTextareaPropsType } from './QuestionTextarea';
import questionRadioConfig, { questionRadioPropsType, radioStatPropsType } from './QuestionRadio';
import questionCheckboxConfig, {
  questionCheckboxPropsType,
  CheckboxStatPropsType,
} from './QuestionCheckbox';

// 各个组件的prop type
export type componentPropsType =
  | questionTitlePropsType
  | questionInputPropsType
  | questionParagraphPropsType
  | questionInfoPropsType
  | questionTextareaPropsType
  | questionRadioPropsType
  | questionCheckboxPropsType;

//各个组件中统计组件的type
type statComponentPropsType = radioStatPropsType | CheckboxStatPropsType;

// 组件的配置type
export interface componentConfigType {
  title: string;
  type: string;
  Component: FC<componentPropsType>;
  PropComponent: FC<componentPropsType>;
  defaultProps: componentPropsType;
  StatComponent?: FC<statComponentPropsType>;
}

// 全部的组件配置的列表
const componentConfigList: componentConfigType[] = [
  questionTitleConfig as componentConfigType,
  questionInputConfig as componentConfigType,
  questionParagraphConfig as componentConfigType,
  questionInfoConfig as componentConfigType,
  questionTextareaConfig as componentConfigType,
  questionRadioConfig as componentConfigType,
  questionCheckboxConfig as componentConfigType,
];
// 组件分组
export const componentGroupConfig = [
  {
    groupId: 'show',
    groupName: '文本展示',
    componentList: [questionTitleConfig, questionInfoConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    componentList: [questionInputConfig, questionParagraphConfig, questionTextareaConfig],
  },
  {
    groupId: 'select',
    groupName: '用户选择',
    componentList: [questionRadioConfig, questionCheckboxConfig],
  },
];
// 页面通过匹配type来获取组件
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((item: componentConfigType) => item.type === type);
}
