import { createSlice } from '@reduxjs/toolkit';

interface INextPostsAction {
  payload: { start: number; end: number };
  type: string;
}

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    start: 0,
    end: 16,
    maxPage: 10,
    limit: 10,
  },
  reducers: {
    nextPosts(state, { payload: { start, end } }: INextPostsAction) {
      state.start = start;
      state.end = end;
    },
  },
});

export const { nextPosts } = postsListSlice.actions;

export const postsListRedusers = postsListSlice.reducer;

