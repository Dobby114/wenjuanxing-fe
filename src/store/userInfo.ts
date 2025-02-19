import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type userInfoType = {
  userId: string;
  username: string;
  nickname?: string;
};
const INIT_STATE: userInfoType = { userId: '', username: '', nickname: '' };
const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: INIT_STATE,
  reducers: {
    loginReducer(state: userInfoType, actions: PayloadAction<userInfoType>) {
      return actions.payload;
    },
    logoutReducer: () => INIT_STATE,
  },
});

export const { loginReducer, logoutReducer } = userInfoSlice.actions;
export default userInfoSlice.reducer;
