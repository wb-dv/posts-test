import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '@/shared/store';

import { nextPosts } from './model';

export const useNextPage = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(nextPosts, dispatch), [dispatch]);
};

export const useInfiniteScroll = () => {
  const page = useAppSelector((state) => state.postsList.page);
  const limit = useAppSelector((state) => state.postsList.limit);
  const maxPage = useAppSelector((state) => state.postsList.maxPage);

  const dispatchNextPage = useNextPage();

  return {
    page,
    limit,
    dispatchNextPage,
    hasNextPage: page < maxPage,
    maxPage,
  };
};
