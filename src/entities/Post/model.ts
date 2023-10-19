import { createSlice } from '@reduxjs/toolkit';
import { IPost } from './api';

interface IPostsState {
  posts: IPost[];
}

interface ISetPostsAction {
  payload: { posts: IPost[] };
  type: string;
}

const initialState: IPostsState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts({ posts: statePosts }, { payload: { posts } }: ISetPostsAction) {
      statePosts.push(...posts);
    },
  },
});

export const { setPosts } = postSlice.actions;

export const postsRedusers = postSlice.reducer;
