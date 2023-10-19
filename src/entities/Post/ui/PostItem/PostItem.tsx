import { useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PagesPaths } from '@/shared/config/router';
import { Button } from '@/shared/ui';

import { IPost } from '../../api';

import styles from './PostItem.module.scss';

interface IPostItem {
  post: IPost;
  customClasses?: string;
  style?: React.CSSProperties;
  // isLastItem?: boolean;
  // nextPage?: () => unknown;
}

export function PostItem({ post, style = {}, customClasses = '' }: IPostItem) {
  const itemRef = useRef<HTMLLIElement>(null);

  const { id, title, body } = post;

  // useEffect(() => {
  //   const lastElem = isLastItem && itemRef.current;

  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       for (const entry of entries) {
  //         if (entry.isIntersecting && isLastItem) {
  //           nextPage();
  //           console.log('loading more');
  //         }
  //       }
  //     },
  //     {
  //       rootMargin: '0px 0px 100px 0px',
  //     }
  //   );

  //   lastElem && io.observe(lastElem);

  //   return () => io.disconnect();
  // }, [nextPage, itemRef, isLastItem]);

  return (
    <li
      className={clsx(styles.PostItem, customClasses)}
      style={{
        ...style,
      }}
      ref={itemRef}
    >
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
