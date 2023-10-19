import { createSlice } from '@reduxjs/toolkit';

interface INextPostsAction {
  payload: { page: number; limit: number };
  type: string;
}

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    page: 1,
    maxPage: 10,
    limit: 10,
  },
  reducers: {
    nextPosts(state, { payload: { page, limit } }: INextPostsAction) {
      if (page > state.maxPage) return;
      state.page = page;
      state.limit = limit;
    },
  },
});

export const { nextPosts } = postsListSlice.actions;

export const postsListRedusers = postsListSlice.reducer;

