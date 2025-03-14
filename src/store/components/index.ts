import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';
import { getNextSelectedId } from './utils';

// 只存放需要渲染组件列表信息
export interface componentInfoType {
  fe_id: string; //前端生成的id，没办法生成符合后端数据库格式的id，所以用fe_id，前端可以直接控制
  type: string;
  title: string;
  props: componentPropsType;
  isHidden: boolean;
}
export interface componentsStateType {
  componentsList: componentInfoType[];
  //   其他扩展
  selectedId: string;
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
      const nextSelectedId = getNextSelectedId(selectedId, componentsList);
      draft.selectedId = nextSelectedId;
      // 删除当前选中的组件
      componentsList.splice(currentIndex, 1);
    }),
    // 修改组件属性
    toggleComponentHidden: produce((draft: componentsStateType) => {
      const { selectedId, componentsList } = draft;
      const currentIndex = componentsList.findIndex(item => item.fe_id === selectedId);
      // 没有找到符合条件的，返回-1
      if (currentIndex < 0) return;
      const currentComponent = componentsList[currentIndex];
      // 切换当前组件的显示/隐藏状态
      if (currentComponent) {
        // 重新获取选中的组件：如果当前是显示状态，则是隐藏操作，重新获取选中组件id；如果当前是隐藏状态，则是显示操作，selectedId=fe_id
        if (currentComponent.isHidden) {
          draft.selectedId = selectedId;
        } else {
          // 这里获取下一个选中index的逻辑和删除是不同的，因为删除会改变componentList，而隐藏和显示不会改变componentList
          // 但是隐藏状态下的组件是不可以被删除的！
          const nextSelectedId = getNextSelectedId(selectedId, componentsList);
          draft.selectedId = nextSelectedId;
        }
        currentComponent.isHidden = !currentComponent.isHidden;
      }
      // console.log(draft.selectedId);
    }),
  },
});

export const {
  resetComponentsReducer,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeComponent,
  toggleComponentHidden,
} = componentsSlice.actions;
export default componentsSlice.reducer;
