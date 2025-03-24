export interface questionInfoPropsType {
  title: string;
  desc: string;
  onChange?: (props: questionInfoPropsType) => void; //每个propComponent传递了change触发changeComponentProps reduce函数
  disabled?: boolean;
  isCenter: boolean;
}

export const questionInfoPropsDefault: questionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
  disabled: false,
  isCenter: true,
};
