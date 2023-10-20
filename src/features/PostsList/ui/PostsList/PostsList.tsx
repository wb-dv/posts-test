import { useRef } from 'react';

import { PostItem } from '@/entities/Post';

import { useVirtualize } from '@/shared/lib';
import { Container } from '@/shared/ui';

import { useInfinitePosts } from '../../model';

import styles from './PostsList.module.scss';

const postHeight = 86;
const gap = 15;

export function PostsList() {
  const containerRef = useRef<HTMLElement>(null);

  const { posts, isSuccess, postsCount, isError } = useInfinitePosts(containerRef);

  const { virtualItems: virtualizedPosts, fullHeight } = useVirtualize({
    containerRef: containerRef,
    elementHight: postHeight,
    elemsCount: postsCount,
    gap: gap,
  });

  return (
    <section
      className={styles.PostsList}
      ref={containerRef}
    >
      <Container>
        {isSuccess && (
          <ul style={{ height: fullHeight, position: 'relative' }}>
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
        )}
        {isError && <div>No posts</div>}
      </Container>
    </section>
  );
}
