import { useEffect } from 'react';

import { useGetPostsQuery, IPost } from '@/entities/Post';

import { useAppDispatch, useAppSelector } from '@/shared/store';

import { nextPage } from './model';

interface IuseInfinitePostsValues {
  posts: IPost[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  postsCount: number;
}

export const useInfinitePosts = <T extends Element>(containerRef: React.RefObject<T>): IuseInfinitePostsValues => {
  const dispatch = useAppDispatch();
  const currPage = useAppSelector((state) => state.postsList.page);

  const { data: posts, isLoading, isSuccess, isFetching, isError } = useGetPostsQuery({ page: currPage });

  const postsCount = isSuccess ? posts.length : 0;

  useEffect(() => {
    const scrollElement = containerRef.current;

    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollInBottom = scrollElement.scrollHeight - scrollElement.scrollTop - window.innerHeight < 200;

      if (scrollInBottom && !isFetching) {
        dispatch(nextPage({ nextPage: currPage + 1 }));
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [containerRef, isFetching, dispatch, currPage]);

  return {
    posts: posts || [],
    isLoading,
    isSuccess,
    isFetching,
    isError,
    postsCount,
  };
};
