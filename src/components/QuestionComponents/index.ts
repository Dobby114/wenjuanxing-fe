import type { FC } from 'react';
import questionTitleConfig, { questionTitlePropsType } from './QuestionTitle';
import questionInputConfig, { questionInputPropsType } from './QuestionInput';

// 各个组件的prop type
export type componentPropsType = questionTitlePropsType | questionInputPropsType;

// 组件的配置type
export interface componentConfigType {
  title: string;
  type: string;
  Component: FC<componentPropsType>;
  defaultProps: componentPropsType;
}

// 全部的组件配置的列表
const componentConfigList: componentConfigType[] = [
  questionTitleConfig as componentConfigType,
  questionInputConfig as componentConfigType,
];
// 组件分组
export const componentGroupConfig = [
  {
    groupId: 'show',
    groupName: '文本展示',
    componentList: [questionTitleConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    componentList: [questionInputConfig],
  },
];
// 页面通过匹配type来获取组件
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((item: componentConfigType) => item.type === type);
}
