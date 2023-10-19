import { useRef, useEffect, useState } from 'react';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';

import { PostItem, useGetPostsQuery } from '@/entities/Post';

import { useInfiniteScroll } from '../../model';

import styles from './PostsList.module.scss';

const postItemHeight = 86;

interface ILoaderItemProps {
  style?: React.CSSProperties;
  myRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const LoaderItem = ({ myRef, style = {} }: ILoaderItemProps) => {
  // const { dispatchNextPage, page, limit } = useInfiniteScroll();

  // useEffect(() => {
  //   const lastElem = myRef.current;

  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       for (const entry of entries) {
  //         if (entry.isIntersecting) {
  //           dispatchNextPage({ page: page + 1, limit });
  //           console.log('loading more');
  //         }
  //       }
  //     },
  //     {
  //       rootMargin: '0px 0px 100px 0px',
  //     }
  //   );

  //   lastElem && io.observe(lastElem);

  //   return () => io.disconnect();
  // }, [dispatchNextPage, limit, page, myRef]);

  return (
    <div
      ref={myRef}
      style={style}
    >
      Loading more...
    </div>
  );
};

export function PostsList() {
  const [myRef, setMyRef] = useState<HTMLDivElement | null>(null);
  // const endOfListRef = useRef<HTMLDivElement>(null);
  const parentElementRef = useRef<HTMLElement | null>(null);

  const { limit, page, dispatchNextPage, hasNextPage } = useInfiniteScroll();

  const { data, isLoading, isSuccess } = useGetPostsQuery({ limit, page });

  const posts = data ?? [];

  const virtualizedList = useVirtualizer({
    // count: 100,
    count: hasNextPage ? posts.length + 1 : posts.length,
    estimateSize: () => postItemHeight,
    getScrollElement: () => parentElementRef.current,
  });

  const virtualItems = virtualizedList.getVirtualItems();

  useEffect(() => {
    const lastElem = myRef;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !isLoading) {
            console.log('fetch page', page);
            dispatchNextPage({ page: page + 1, limit });
            console.log('loading more');
          }
          console.log('observer');
        }
      },
      {
        rootMargin: '0px 0px 100px 0px',
      }
    );

    lastElem && io.observe(lastElem);

    return () => io.disconnect();
  }, [dispatchNextPage, limit, page, myRef, isLoading]);

  // useEffect(() => {
  //   const [lastItem] = [...virtualItems].reverse();
  //   console.log('lastItem', lastItem);

  //   if (!lastItem) {
  //     return;
  //   }
  //   console.log();
  //   if (lastItem.index >= posts.length - 1 && hasNextPage && !isLoading) {
  //     dispatchNextPage({ page: page + 1, limit });
  //   }
  // }, [hasNextPage, isLoading, posts.length, virtualItems, dispatchNextPage, limit, page]);

  return (
    <section
      ref={parentElementRef}
      className={styles.PostsList__wrapper}
    >
      {isSuccess && !isLoading ? (
        <ol
          className={styles.PostsList}
          style={{
            height: `${virtualizedList.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualItem) => {
            const isLoaderItem = virtualItem.index > posts.length - 1;
            // const isLastItem = virtualItem.index === posts.length - 1;
            const post = posts[virtualItem.index];

            // if (!hasNextPage)
            //   return (
            //     <div
            //       key={virtualItem.key}
            //       style={{ height: virtualItem.size, transform: `translateY(${virtualItem.start}px)` }}
            //     >
            //       End of list
            //     </div>
            //   );

            if (isLoaderItem)
              return (
                <LoaderItem
                  key={virtualItem.key}
                  style={{ height: virtualItem.size, transform: `translateY(${virtualItem.start}px)` }}
                />
              );

            return (
              <PostItem
                post={post}
                key={virtualItem.key}
                style={{ height: virtualItem.size, transform: `translateY(${virtualItem.start}px)` }}
                // isLastItem={isLastItem}
                // nextPage={() => dispatchNextPage({ page: page + 1, limit })}
              />
            );
          })}
          <div ref={setMyRef}></div>
        </ol>
      ) : (
        <div>No posts</div>
      )}
      {isLoading && <div>Loading...</div>}
    </section>
  );
}
