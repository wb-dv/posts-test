import { createSlice } from '@reduxjs/toolkit';

import { MAX_PAGE_COUNT } from '@/entities/Post';

interface INextPostsAction {
  payload: { nextPage: number };
  type: string;
}

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    page: 1,
    maxPageCount: MAX_PAGE_COUNT,
  },
  reducers: {
    nextPage(state, { payload: { nextPage } }: INextPostsAction) {
      if (nextPage > state.maxPageCount) return;
      state.page = nextPage;
    },
  },
});

export const { nextPage } = postsListSlice.actions;

export const postsListRedusers = postsListSlice.reducer;
