import styles from './MainPage.module.scss';

import { PostsList } from '@/features/PostsList/ui';

export function MainPage() {
  return (
    <main className={styles.MainPage}>
      <PostsList />
    </main>
  );
}
