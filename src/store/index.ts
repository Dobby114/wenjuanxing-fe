import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer, { userInfoType } from './userInfo';

export type storeType = {
  userInfo: userInfoType;
};
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
