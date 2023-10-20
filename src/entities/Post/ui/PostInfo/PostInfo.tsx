import clsx from 'clsx';

import { useGetPostQuery } from '../..';

import styles from './PostInfo.module.scss';

interface IPostInfoProps {
  postId: string;
  customClasses?: string;
}

export function PostInfo({ postId, customClasses = '' }: IPostInfoProps) {
  const { data, isLoading, isSuccess } = useGetPostQuery(postId);

  return (
    <div className={clsx(styles.PostInfo, customClasses)}>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isSuccess ? (
        <>
          <h2 className={styles.PostInfo__title}>{data.title}</h2>
          <p>{data.body}</p>
        </>
      ) : (
        <div>Не удалось загрузить пост</div>
      )}
    </div>
  );
}

