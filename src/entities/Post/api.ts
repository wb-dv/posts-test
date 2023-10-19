import { api } from '@/shared/api';
// import { setPosts } from './model';

export interface IGetPostsparams {
  page: number;
  limit: number;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    getPost: query<IPost, number>({
      query: (id) => `/posts/${id}`,
    }),
    getPosts: query<IPost[], IGetPostsparams>({
      query: ({ page, limit }) => `/posts?_page=${page}&_limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currPosts, newPosts) => {
        return [...currPosts, ...newPosts];
      },
      forceRefetch({ currentArg, previousArg }) {
        return previousArg !== currentArg;
      },
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery } = postApi;

export const usePostsQueryState = postApi.endpoints.getPosts.useQueryState;
