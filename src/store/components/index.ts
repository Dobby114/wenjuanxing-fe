import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';
import { getNextIndex } from './utils';

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
      (draft: componentsStateType, actions: PayloadAction<Partial<componentsStateType>>) => {
        draft.selectedId = actions.payload?.selectedId || '';
      }
    ),
    addComponent: produce(
      (draft: componentsStateType, actions: PayloadAction<componentInfoType>) => {
        // 当前没有选中，添加到最后并选中；当前有选中，添加到选中后面，并选中
        const { selectedId, componentsList } = draft;
        const newComponent = actions.payload;
        const selectedIndex = componentsList.findIndex(item => item.fe_id === selectedId);
        if (selectedIndex < 0) {
          componentsList.push(newComponent);
        } else {
          componentsList.splice(selectedIndex + 1, 0, newComponent);
        }
        draft.selectedId = newComponent.fe_id;
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: componentsStateType,
        actions: PayloadAction<{ fe_id: string; newProps: Partial<componentPropsType> }>
      ) => {
        const { componentsList } = draft;
        const { fe_id, newProps } = actions.payload;
        const currentComponent = componentsList.find(item => item.fe_id === fe_id);
        if (currentComponent) {
          // produce可以直接这么改？？？，直接找到list里面某个对象的属性然后修改，list里的就全改了？？？
          currentComponent.props = {
            ...currentComponent.props,
            ...newProps,
          } as componentPropsType;
        }
      }
    ),
    // 删除选中的组件,并根据逻辑选中下一个组件
    removeComponent: produce((draft: componentsStateType) => {
      const { selectedId, componentsList } = draft;
      const currentIndex = componentsList.findIndex(item => item.fe_id === selectedId);
      // 没有找到符合条件的，返回-1
      if (currentIndex < 0) return;
      // 找到下一个选中的组件index
      const nextSelectedIndex = getNextIndex(currentIndex, componentsList);
      console.log('nextSelectedIndex', nextSelectedIndex);
      draft.selectedId =
        (nextSelectedIndex && componentsList[Number(nextSelectedIndex)]?.fe_id) || '';
      // 删除当前选中的组件
      componentsList.splice(currentIndex, 1);
    }),
  },
});

export const {
  resetComponentsReducer,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
