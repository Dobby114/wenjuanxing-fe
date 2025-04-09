export type optionsType = {
  label: string;
  checked: boolean;
  value: string;
};

export interface questionCheckboxPropsType {
  title: string;
  options: optionsType[];
  isVertical: boolean;
  disabled: boolean;
  onChange?: (props: questionCheckboxPropsType) => void;
}

export const questionCheckboxPropsDefault: questionCheckboxPropsType = {
  title: '多选框标题',
  options: [
    { label: '选项1', value: 'option1', checked: false },
    { label: '选项2', value: 'option2', checked: false },
    { label: '选项3', value: 'option3', checked: false },
  ],
  isVertical: false,
  disabled: false,
};

export type CheckboxStatPropsType = {
  statData: Array<{ name: string; count: number }>;
};
