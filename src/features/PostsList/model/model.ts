import { createSlice } from '@reduxjs/toolkit';

import { MAX_PAGE_COUNT } from '@/entities/Post';

interface INextPostsAction {
  payload: { newPage: number };
  type: string;
}

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    page: 1,
    maxPageCount: MAX_PAGE_COUNT,
  },
  reducers: {
    nextPosts(state, { payload: { newPage } }: INextPostsAction) {
      if (newPage > state.maxPageCount) return;
      state.page = newPage;
    },
  },
});

export const { nextPosts } = postsListSlice.actions;

export const postsListRedusers = postsListSlice.reducer;
