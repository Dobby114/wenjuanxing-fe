import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer, { userInfoType } from './userInfo';
import componentsReducer, { componentsStateType } from './components';
import pageInfoReducer, { pageInfoType } from './pageInfo';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

export type storeType = {
  userInfo: userInfoType;
  components: StateWithHistory<componentsStateType>;
  pageInfo: pageInfoType;
};
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    // 把问卷信息和组件列表信息分开存放
    // 组件列表信息
    // components: componentsReducer,
    // 使用redux-undo来实现撤销和重做功能
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction(['components/resetComponentsReducer', 'components/changeSelectedId']),
      ignoreInitialState: true,
    }),
    // 问卷信息 title desc...
    pageInfo: pageInfoReducer,
  },
});
