import { api } from '@/shared/api';

export interface IGetPostsparams {
  page: number;
  limit?: number;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const POSTS_LIMIT = 15;
export const MAX_POSTS_COUNT = 100;
export const MAX_PAGE_COUNT = Math.ceil(MAX_POSTS_COUNT / POSTS_LIMIT);

const postApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    getPost: query<IPost, string>({
      query: (id) => `/posts/${id}`,
    }),
    getPosts: query<IPost[], IGetPostsparams>({
      query: ({ page, limit = POSTS_LIMIT }) => `/posts?_page=${page}&_limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (a, b) => [...a, ...b],
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
    }),
    getCommentsByPostId: query<IComment[], string>({
      query: (id) => `/posts/${id}/comments`,
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery, useGetCommentsByPostIdQuery } = postApi;

export const usePostsQueryState = postApi.endpoints.getPosts.useQueryState;
