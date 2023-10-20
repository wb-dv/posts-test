import clsx from 'clsx';

import styles from './Container.module.scss';

interface IContainerProps {
  customClasses?: string;
  children: React.ReactNode;
}

export function Container({ children, customClasses = '' }: IContainerProps) {
  return <div className={clsx(styles.Container, customClasses)}>{children}</div>;
}
