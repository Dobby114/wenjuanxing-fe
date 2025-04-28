import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';
import { getNextSelectedId, insertComponent } from './utils';
import clonedeep from 'lodash.clonedeep';
import { nanoid } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';

// 只存放需要渲染组件列表信息
// 这里都是需要和后端约定好的返回数据！！！
export interface componentInfoType {
  fe_id: string; //前端生成的id，没办法生成符合后端数据库格式的id，所以用fe_id，前端可以直接控制
  type: string;
  title: string;
  props: componentPropsType;
  isHidden: boolean;
  isLocked: boolean;
}
export interface componentsStateType {
  componentList: componentInfoType[];
  //   其他扩展
  selectedId: string;
  // 存储复制的组件
  copiedComponent: componentInfoType | null;
}
const INIT_STATE: componentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
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
      (draft: componentsStateType, actions: PayloadAction<{ selectedId: string }>) => {
        draft.selectedId = actions.payload?.selectedId || '';
      }
    ),
    addComponent: produce(
      (draft: componentsStateType, actions: PayloadAction<componentInfoType>) => {
        // 当前没有选中，添加到最后并选中；当前有选中，添加到选中后面，并选中
        const { selectedId, componentList } = draft;
        const newComponent = actions.payload;
        insertComponent(selectedId, componentList, newComponent);
        draft.selectedId = newComponent.fe_id;
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: componentsStateType,
        actions: PayloadAction<{ fe_id: string; newProps: Partial<componentPropsType> }>
      ) => {
        const { componentList } = draft;
        const { fe_id, newProps } = actions.payload;
        const currentComponent = componentList.find(item => item.fe_id === fe_id);
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
      const { selectedId, componentList } = draft;
      const currentIndex = componentList.findIndex(item => item.fe_id === selectedId);
      // 没有找到符合条件的，返回-1
      if (currentIndex < 0) return;
      // 找到下一个选中的组件index
      const nextSelectedId = getNextSelectedId(selectedId, componentList);
      draft.selectedId = nextSelectedId;
      // 删除当前选中的组件
      componentList.splice(currentIndex, 1);
    }),
    // 修改组件隐藏/显示状态
    toggleComponentHidden: produce(
      (draft: componentsStateType, actions: PayloadAction<{ fe_id: string }>) => {
        const { selectedId, componentList } = draft;
        const { fe_id } = actions.payload;
        const currentComponent = componentList.find(item => item.fe_id === fe_id);
        // 没有找到符合条件的，返回-1
        if (!currentComponent) return;
        // 切换当前组件的显示/隐藏状态
        if (currentComponent) {
          // 重新获取选中的组件：如果当前是显示状态，则是隐藏操作，重新获取选中组件id；如果当前是隐藏状态，则是显示操作，selectedId=fe_id
          if (currentComponent.isHidden) {
            draft.selectedId = selectedId;
          } else {
            // 这里获取下一个选中index的逻辑和删除是不同的，因为删除会改变componentList，而隐藏和显示不会改变componentList
            // 但是隐藏状态下的组件是不可以被删除的！
            const nextSelectedId = getNextSelectedId(selectedId, componentList);
            draft.selectedId = nextSelectedId;
          }
          currentComponent.isHidden = !currentComponent.isHidden;
        }
        // console.log(draft.selectedId);
      }
    ),
    // 修改组件锁定/解锁状态
    toggleComponentLocked: produce(
      (draft: componentsStateType, actions: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft;
        const { fe_id } = actions.payload;
        const currentComponent = componentList.find(item => item.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.isLocked = !currentComponent.isLocked;
        }
      }
    ),
    // 复制选中的组件
    copySelectedComponent: produce((draft: componentsStateType) => {
      const { selectedId, componentList } = draft;
      const currentComponent = componentList.find(item => item.fe_id === selectedId);
      if (currentComponent) {
        // 必须要深度拷贝当前选中的组件，然后赋值
        draft.copiedComponent = clonedeep(currentComponent);
      }
    }),
    // 粘贴复制的组件
    pasteCopiedComponent: produce((draft: componentsStateType) => {
      const { selectedId, componentList, copiedComponent } = draft;
      if (copiedComponent === null) return;
      copiedComponent.fe_id = nanoid(5);
      insertComponent(selectedId, componentList, copiedComponent);
      draft.selectedId = copiedComponent.fe_id;
    }),
    // 修改组件title
    changeComponentTitle: produce(
      (draft: componentsStateType, actions: PayloadAction<{ fe_id: string; newTitle: string }>) => {
        const { fe_id, newTitle } = actions.payload;
        const { componentList } = draft;
        const curComponent = componentList.find(item => item.fe_id === fe_id);
        if (curComponent) {
          curComponent.title = newTitle;
        }
      }
    ),
    // 修改组件顺序
    changeComponentIndex: produce(
      (
        draft: componentsStateType,
        actions: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList } = draft;
        const { oldIndex, newIndex } = actions.payload;
        draft.componentList = arrayMove(componentList, oldIndex, newIndex);
      }
    ),
  },
});

export const {
  resetComponentsReducer,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  changeComponentTitle,
  changeComponentIndex,
} = componentsSlice.actions;
export default componentsSlice.reducer;
