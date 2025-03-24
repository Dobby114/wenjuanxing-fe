export interface questionTextareaPropsType {
  title: string;
  placeholder: string;
  onChange?: (props: questionTextareaPropsType) => void;
  disabled?: boolean;
}
export const questionTextareaPropsDefault = {
  title: '输入框标题',
  placeholder: '请输入...',
  disabled: false,
};
