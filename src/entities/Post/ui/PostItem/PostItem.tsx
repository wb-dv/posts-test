import { useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PagesPaths } from '@/shared/config/router';
import { useAppSelector } from '@/shared/store';
import { Button } from '@/shared/ui';

// import { IPost } from '../../api';

import styles from './PostItem.module.scss';

interface IPostItem {
  index: number;
  customClasses?: string;
  style: React.CSSProperties;
  onLastItem?: () => void;
}

export function PostItem({ index, style, customClasses = '' }: IPostItem) {
  const itemRef = useRef<HTMLLIElement>(null);

  const { id, title, body } = useAppSelector((state) => state.posts.posts[index]);

  // useEffect(() => {
  //   const item = itemRef.current;

  //   const intersectionObserver = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           onLastItem && onLastItem();
  //         }
  //       });
  //     },
  //     {
  //       rootMargin: '0px 0px 20px 0px',
  //     }
  //   );

  //   if (item && isLast) {
  //     intersectionObserver.observe(item);
  //   }

  //   return () => {
  //     item && intersectionObserver.unobserve(item);
  //   };
  // }, [onLastItem, itemRef, isLast]);

  return (
    <li
      className={clsx(styles.PostItem, customClasses)}
      style={{
        ...style,
        // top: `${parseFloat(String(style.top)) + 20 * (id - 1)}px`,
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

