// import { useRef, useCallback, useDeferredValue } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import { PostItem, useGetPostsQuery } from '@/entities/Post';
import { useAppSelector } from '@/shared/store';

import { useInfiniteScroll, useNextPage } from '../../model';

import styles from './PostsList.module.scss';

const postItemHeight = 86;

export function PostsList() {
  // const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { start, end } = useInfiniteScroll();

  const { data, isLoading, isSuccess } = useGetPostsQuery({ start, end });
  data;
  const posts = useAppSelector((state) => state.posts.posts);

  const dispatchNextPage = useNextPage();

  // const loadMorePosts = useDeferredValue(
  //   useCallback(
  //     ({ scrollOffset }: ListOnScrollProps) => {
  //       const scrollContainer = scrollContainerRef.current;
  //       if (!scrollContainer || !isSuccess || isLoading) return;
  //       const scrollContainerViewHeight = scrollContainer.clientHeight;
  //       const scrollContainerAllHeight = scrollContainer.scrollHeight;

  //       console.log('scrollOffset', scrollOffset);
  //       console.log('scrollContainerViewHeight', scrollContainerViewHeight);
  //       console.log('scrollContainerAllHeight', scrollContainerAllHeight);
  //       console.log('scrollOffset + scrollContainerViewHeight', scrollOffset + scrollContainerViewHeight);

  //       console.log('scrollOffset + scrollContainerViewHeight >= scrollContainerAllHeight', scrollOffset + scrollContainerViewHeight >= scrollContainerAllHeight);

  //       if (scrollOffset + scrollContainerViewHeight >= scrollContainerAllHeight - 50) {
  //         dispatchNextPage();
  //       }
  //     },
  //     [scrollContainerRef, dispatchNextPage, isSuccess, isLoading]
  //   )
  // );

  const loadMorePosts = (startIndex: number, stopIndex: number) => {
    console.log('loadMorePosts');
    dispatchNextPage({ start: startIndex, end: stopIndex });
  };

  return (
    <section className={styles.PostsList}>
      {isSuccess ? (
        <AutoSizer>
          {({ width, height }) => (
            <InfiniteLoader
              loadMoreItems={loadMorePosts}
              itemCount={posts.length}
              isItemLoaded={(index) => index < posts.length}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  innerElementType={'ol'}
                  width={width}
                  height={height}
                  itemCount={posts.length}
                  itemSize={postItemHeight}
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                  // outerRef={scrollContainerRef}
                  // onScroll={loadMorePosts}
                >
                  {PostItem}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      ) : (
        <div>No posts</div>
      )}
      {isLoading && <div>Loading...</div>}
    </section>
  );
}

