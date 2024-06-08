import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { CategoriesApi } from '../../shared/API/CategoriesApi';
import { AuthApi } from '../api/apiSlices/AuthApi';
import { EventApi } from '../api/apiSlices/EventApi';
import { bottomSheetSlice } from './slice/BottomSheetSlice';

const rootReducer = combineReducers({
  [bottomSheetSlice.name]: bottomSheetSlice.reducer,

  // api
  [EventApi.reducerPath]: EventApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [CategoriesApi.reducerPath]: CategoriesApi.reducer
});
export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      EventApi.middleware,
      CategoriesApi.middleware,
      AuthApi.middleware
    ]);
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
