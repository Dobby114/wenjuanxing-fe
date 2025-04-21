export type optionsType = {
  label: string;
  value: string;
};
export interface questionRadioPropsType {
  title: string;
  options: optionsType[];
  value: string;
  defaultSelected?: string;
  isVertical: boolean;
  disabled?: boolean;
  onChange?: (props: questionRadioPropsType) => void;
}

export const questionRadioPropsDefault: questionRadioPropsType = {
  title: '单选标题',
  options: [
    { label: '选项1', value: 'item1' },
    { label: '选项2', value: 'item2' },
    { label: '选项3', value: 'item3' },
  ],
  isVertical: false,
  disabled: false,
  value: '',
};

export interface radioStatPropsType {
  statData: Array<{ name: string; count: number }>;
}
