import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';

// 只存放需要渲染组件列表信息
export interface componentInfoType {
  fe_id: string; //前端生成的id，没办法生成符合后端数据库格式的id，所以用fe_id，前端可以直接控制
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
    addComponent: produce(
      (state: componentsStateType, actions: PayloadAction<componentInfoType>) => {
        // 当前没有选中，添加到最后并选中；当前有选中，添加到选中后面，并选中
        const { selectedId, componentsList } = state;
        const newComponent = actions.payload;
        const selectedIndex = componentsList.findIndex(item => item.fe_id === selectedId);
        if (selectedIndex < 0) {
          componentsList.push(newComponent);
        } else {
          componentsList.splice(selectedIndex + 1, 0, newComponent);
        }
        state.selectedId = newComponent.fe_id;
      }
    ),
  },
});

export const { resetComponentsReducer, changeSelectedId, addComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
