import clsx from 'clsx';

import DefaultAvatar from '@/shared/assets/icons/avatar.png';

import { IComment } from '../../api';

import styles from './PostComment.module.scss';

interface IPostCommentProps {
  comment: IComment;
  customClasses?: string;
}

export function PostComment({ comment, customClasses = '' }: IPostCommentProps) {
  const { name, email, body } = comment;
  return (
    <div className={clsx(styles.PostComment, customClasses)}>
      <div className={styles.PostComment__owner}>
        <img
          src={DefaultAvatar}
          alt="Аватар"
          className={styles.PostComment__ownerAvatar}
        />
        <div>
          <h3 className={styles.PostComment__ownerName}>{name}</h3>
          <span>{email}</span>
        </div>
      </div>
      <p>{body}</p>
    </div>
  );
}

