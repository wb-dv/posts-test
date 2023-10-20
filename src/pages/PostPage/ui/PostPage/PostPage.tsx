import { useParams } from 'react-router-dom';

import { BackButton } from '@/features/Navigation';

import { PostCommetsList, PostInfo } from '@/entities/Post';

import { Container } from '@/shared/ui';

import styles from './PostPage.module.scss';

export function PostPage() {
  const { id } = useParams();

  return (
    <main className={styles.PostPage}>
      <Container>
        <BackButton />
        {!!id && (
          <PostInfo
            postId={id}
            customClasses={styles.PostPage__info}
          />
        )}
        {!!id && <PostCommetsList postId={id} />}
      </Container>
    </main>
  );
}

