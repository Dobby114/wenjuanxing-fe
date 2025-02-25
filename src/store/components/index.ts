import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';

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
  selectedId?: string;
}
const INIT_STATE: componentsStateType = {
  componentsList: [],
  selectedId: '',
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
    // 使用immer来直接修改部分数据
    changeSelectedId: produce(
      (state: componentsStateType, actions: PayloadAction<Partial<componentsStateType>>) => {
        state.selectedId = actions.payload?.selectedId || '';
      }
    ),
  },
});

export const { resetComponentsReducer, changeSelectedId } = componentsSlice.actions;
export default componentsSlice.reducer;
