import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PagesPaths } from '@/shared/config/router';
import { Button } from '@/shared/ui';

import { IPost } from '../../api';

import styles from './PostItem.module.scss';

interface IPostItem {
  post: IPost;
  customClasses?: string;
}

export function PostItem({ post, customClasses = '' }: IPostItem) {
  const { id, title, body } = post;

  return (
    <li className={clsx(styles.PostItem, customClasses)}>
      <span>{id}.</span>
      <h3 className={styles.PostItem__title}>{title}</h3>
      <p className={styles.PostItem__body}>{body}</p>
      <Link
        className={styles.PostItem__link}
        to={PagesPaths.Post(id)}
      >
        <Button>просмотр</Button>
      </Link>
    </li>
  );
}

