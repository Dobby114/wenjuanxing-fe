export interface questionTitlePropsType {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  onChange?: (props: questionTitlePropsType) => void;
  disabled?: boolean;
}

export const questionTitlePropsDefault = {
  text: '一行标题',
  level: 1,
  isCenter: false,
  disabled: false,
};
