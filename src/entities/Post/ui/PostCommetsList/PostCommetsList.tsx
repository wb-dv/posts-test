import clsx from 'clsx';

import { useGetCommentsByPostIdQuery } from '../..';
import { PostComment } from '..';

import styles from './PostCommetsList.module.scss';

interface IPostCommetsListProps {
  postId: string;
  customClasses?: string;
}

export function PostCommetsList({ postId, customClasses = '' }: IPostCommetsListProps) {
  const { data: comments, isLoading, isSuccess } = useGetCommentsByPostIdQuery(postId);

  return (
    <div className={clsx(styles.PostCommetsList, customClasses)}>
      <h2 className={styles.PostCommetsList__title}>Комментарии</h2>
      <ul>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : isSuccess ? (
          comments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              customClasses={styles.PostCommetsList__item}
            />
          ))
        ) : (
          <div>Не удалось загрузить комментарии</div>
        )}
      </ul>
    </div>
  );
}

