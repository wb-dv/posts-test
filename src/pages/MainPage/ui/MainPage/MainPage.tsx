// import { Link } from 'react-router-dom';

import styles from './MainPage.module.scss';
// import { Container } from '@/shared/ui';
import { PostsList } from '@/features/PostsList/ui';

export function MainPage() {
  return (
    <main className={styles.MainPage}>
      {/* <Container customClasses={styles.MainPage__container}>
        <h1>Posts list</h1>
      </Container> */}
      <PostsList />
    </main>
  );
}
