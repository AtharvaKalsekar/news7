import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { TopStoriesApi } from './apis';

export const store = configureStore({
  reducer: {
    [TopStoriesApi.reducerPath]: TopStoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TopStoriesApi.middleware),
});

setupListeners(store.dispatch);
