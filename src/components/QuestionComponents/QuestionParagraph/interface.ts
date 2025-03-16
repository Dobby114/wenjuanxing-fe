export interface questionParagraphPropsType {
  text: string;
  isCenter: boolean;
  onChange?: (props: questionParagraphPropsType) => void;
  disabled: boolean;
}
export const questionParagraphPropsDefault: questionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
  disabled: false,
};
