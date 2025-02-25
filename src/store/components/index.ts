import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';

// 只存放需要渲染组件列表信息
export interface componentInfoType {
  fe_id: string;
  type: string;
  title: string;
  props: componentPropsType;
}
export interface componentsStateType {
  componentsList: componentInfoType[];
  //   其他扩展
}
const INIT_STATE: componentsStateType = {
  componentsList: [],
};
const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置页面上渲染的所有组件（重新渲染）
    resetComponentsReducer(
      state: componentsStateType,
      actions: PayloadAction<componentsStateType>
    ) {
      return actions.payload;
    },
  },
});

export const { resetComponentsReducer } = componentsSlice.actions;
export default componentsSlice.reducer;
