import { configureStore } from '@reduxjs/toolkit';

import { postsListRedusers } from '@/features/PostsList/model';

import { api } from '@/shared/api';

export const store = configureStore({
  reducer: {
    postsList: postsListRedusers,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
