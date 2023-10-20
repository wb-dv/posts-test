import { useState, useEffect, useRef } from 'react';

import { PostItem, useGetPostsQuery, MAX_PAGE_COUNT } from '@/entities/Post';

import styles from './PostsList.module.scss';
import { useVirtualize } from '../../model/useVirtualize';

const postHeight = 86;
const gap = 15;

export function PostsList() {
  // const [currPost, setCurrPost] = useState(0);
  // const [currPage, setCurrPage] = useState(1);
  const [currFetchPage, setCurrFetchPage] = useState(1);
  const { data: posts, isLoading, isSuccess, isFetching } = useGetPostsQuery({ page: currFetchPage });
  // const [pageInTop, setPageInTop] = useState(false);
  const [pageInBottom, setPageInBottom] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const postsCount = isSuccess ? posts.length : 0;

  const virtualizedPosts = useVirtualize({
    containerRef: containerRef,
    elementHight: postHeight,
    elemsCount: postsCount,
    gap: gap,
  });

  // console.log('slicedPosts', slicedPosts);
  // console.log('start', start);
  // console.log('end', end);

  useEffect(() => {
    if (pageInBottom) {
      !isFetching && setCurrFetchPage((prev) => (prev < MAX_PAGE_COUNT ? prev + 1 : prev));
      setPageInBottom(false);
    }
  }, [pageInBottom, isFetching]);

  useEffect(() => {
    const scrollElement = containerRef.current;

    if (!scrollElement) return;

    const handleScroll = () => {
      if (scrollElement.scrollHeight - scrollElement.scrollTop - window.innerHeight < 50) {
        setPageInBottom(true);
        // window.scrollTo(0, document.documentElement.scrollHeight + document.documentElement.scrollTop);
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={styles.PostsList}
      ref={containerRef}
    >
      {isSuccess ? (
        <ul style={{ height: postsCount * (postHeight + gap) - gap, position: 'relative' }}>
          {virtualizedPosts.map(({ index, offset }) => {
            const post = posts[index];

            return (
              <PostItem
                style={{
                  height: postHeight,
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${offset}px)`,
                }}
                key={post.id}
                post={post}
              />
            );
          })}
        </ul>
      ) : (
        <div>No posts</div>
      )}
      {isLoading && <div>Loading...</div>}
    </section>
  );
}
