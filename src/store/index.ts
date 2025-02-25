import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer, { userInfoType } from './userInfo';
import componentsReducer, { componentsStateType } from './components';

export type storeType = {
  userInfo: userInfoType;
  components: componentsStateType;
};
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    // 把问卷信息和组件列表信息分开存放
    // 组件列表信息
    components: componentsReducer,
    // 问卷信息 title desc...
  },
});
