import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type pageInfoType = {
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: pageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfoReducer: (state: pageInfoType, actions: PayloadAction<pageInfoType>) => {
      return actions.payload;
    },
  },
});

export const { resetPageInfoReducer } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
