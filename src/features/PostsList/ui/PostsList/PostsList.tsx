import { useState, useEffect } from 'react';

import { PostItem, useGetPostsQuery } from '@/entities/Post';

import styles from './PostsList.module.scss';

const MAX_POSTS_COUNT = 100;

export function PostsList() {
  const [currPost, setCurrPost] = useState(0);
  const { data: posts, isLoading, isSuccess } = useGetPostsQuery({ start: currPost });
  const [pageInTop, setPageInTop] = useState(false);
  const [pageInBottom, setPageInBottom] = useState(false);

  useEffect(() => {
    if (pageInBottom) {
      setCurrPost((prev) => (prev < MAX_POSTS_COUNT ? prev + 1 : prev));
      setPageInBottom(false);
    }
  }, [pageInBottom]);

  useEffect(() => {
    if (pageInTop) {
      setCurrPost((prev) => (prev > 0 ? prev - 1 : prev));
      setPageInTop(false);
    }
  }, [pageInTop]);

  useEffect(() => {
    // const scrollElement = document.scrollingElement;

    const handleScroll = (e: any) => {
      if (e.target.documentElement.scrollTop < 200) {
        setPageInTop(true);
      }
      if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 200) {
        setPageInBottom(true);
        window.scrollTo(0, e.target.documentElement.scrollHeight + e.target.documentElement.scrollTop);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.PostsList}>
      <ul>
        {isSuccess ? (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <div>No posts</div>
        )}
      </ul>
      {isLoading && <div>Loading...</div>}
    </section>
  );
}
