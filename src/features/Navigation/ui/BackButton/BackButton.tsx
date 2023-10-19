import { useNavigate } from 'react-router-dom';

import { Button, Variants } from '@/shared/ui';

import styles from './BackButton.module.scss';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant={Variants.Secondary}
      customClasses={styles.BackButton}
      onClick={() => navigate(-1)}
    >
      <svg
        className={styles.BackButton__arrow}
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7359 0.588267C11.5667 0.425034 11.3373 0.333334 11.098 0.333334C10.8588 0.333334 10.6294 0.425034 10.4602 0.588267L5.99455 4.89829L1.52889 0.588266C1.35874 0.429659 1.13086 0.341896 0.894314 0.34388C0.657773 0.345864 0.431501 0.437436 0.264234 0.598873C0.0969673 0.760309 0.00209003 0.978695 3.48387e-05 1.20699C-0.0020213 1.43529 0.0889106 1.65523 0.253246 1.81945L5.35673 6.74507C5.52591 6.9083 5.75533 7 5.99455 7C6.23377 7 6.4632 6.9083 6.63238 6.74507L11.7359 1.81945C11.905 1.65617 12 1.43474 12 1.20386C12 0.972979 11.905 0.75155 11.7359 0.588267Z"
          fill="white"
        />
      </svg>
      Назад
    </Button>
  );
}

