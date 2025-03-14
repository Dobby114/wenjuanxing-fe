export interface questionInputPropsType {
  title: string;
  placeholder: string;
  onChange?: (props: questionInputPropsType) => void;
  disabled?: boolean;
}
export const questionInputPropsDefault = {
  title: '输入框标题',
  placeholder: '请输入...',
  disabled: false,
};
