import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { PostPage } from '@/pages/PostPage';
import { ErrorPage } from '@/pages/ErrorPage';

import { PagesPaths } from '@/shared/config/router';

export const router = createBrowserRouter([
  {
    path: PagesPaths.Main,
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesPaths.Post(),
    element: <PostPage />,
  },
]);
