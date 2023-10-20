import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '@/shared/store';

import { nextPosts } from './model';

export const useInfiniteScroll = () => {
  const start = useAppSelector((state) => state);
  const end = useAppSelector((state) => state);

  return {
    start,
    end,
  };
};

export const useNextPage = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(nextPosts, dispatch), [dispatch]);
};
