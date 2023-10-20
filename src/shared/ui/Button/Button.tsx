import clsx from 'clsx';

import { Variants } from '..';

import styles from './Button.module.scss';

type TagNames = keyof JSX.IntrinsicElements;

interface IButtonProps {
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  customClasses?: string;
  variant?: Variants;
  tag?: TagNames;
  onClick?: () => void;
}

export function Button({ children, type = 'button', variant = Variants.Primary, customClasses = '', tag: Element, onClick }: IButtonProps) {
  if (Element) {
    return (
      <Element
        className={clsx(styles.Button, styles[`Button_${variant}`], customClasses)}
        onClick={onClick}
      >
        {children}
      </Element>
    );
  }

  return (
    <button
      type={type}
      className={clsx(styles.Button, styles[`Button_${variant}`], customClasses)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
