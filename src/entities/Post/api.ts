import { api } from '@/shared/api';

export interface IGetPostsparams {
  start: number;
  limit?: number;
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
      query: ({ start, limit = 25 }) => `/posts?_start=${start}&_limit=${limit}`,
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery } = postApi;

export const usePostsQueryState = postApi.endpoints.getPosts.useQueryState;
