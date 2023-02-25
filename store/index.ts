import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { AuthApi, TopStoriesApi } from './apis';
import { AuthSlice } from './slices';

const reducer = combineReducers({
  [TopStoriesApi.reducerPath]: TopStoriesApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  auth: AuthSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(TopStoriesApi.middleware)
      .concat(AuthApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export * from "./apis";
