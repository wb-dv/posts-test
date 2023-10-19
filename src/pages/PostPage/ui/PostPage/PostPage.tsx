import { useParams } from 'react-router-dom';

import styles from './PostPage.module.scss';
import { BackButton } from '@/features/Navigation/ui/BackButton/BackButton';
import { Container } from '@/shared/ui';

export function PostPage() {
  const { id } = useParams();

  return (
    <main className={styles.PostPage}>
      <Container>
        <BackButton />
        Post id: {id}
      </Container>
    </main>
  );
}

