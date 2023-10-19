import { api } from '@/shared/api';
// import { setPosts } from './model';

export interface IGetPostsparams {
  start: number;
  end: number;
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
      query: ({ start, end }) => `/posts?_start=${start}&_end=${end}`,
      // onCacheEntryAdded: (_, { dispatch, cacheDataLoaded }) => {
      //   console.log('onCacheEntryAdded');
      //   cacheDataLoaded.then((data) => {
      //     dispatch(setPosts({ posts: data.data }));
      //   });
      // },
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery } = postApi;

export const usePostsQueryState = postApi.endpoints.getPosts.useQueryState;
