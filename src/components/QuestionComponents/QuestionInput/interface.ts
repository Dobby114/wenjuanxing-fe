export interface questionInputPropsType {
  title: string;
  placeholder: string;
  onChange?: (props: questionInputPropsType) => void;
}
export const questionInputPropsDefault = { title: '输入框标题', placeholder: '请输入...' };
