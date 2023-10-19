import { configureStore } from '@reduxjs/toolkit';

import { postsListRedusers } from '@/features/PostsList/model';
import { postsRedusers } from '@/entities/Post/model';
import { api } from '@/shared/api';

export const store = configureStore({
  reducer: {
    postsList: postsListRedusers,
    posts: postsRedusers,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
