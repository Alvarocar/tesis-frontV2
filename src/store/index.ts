import { configureStore } from "@reduxjs/toolkit";
import { applicantApi } from "./features/applicant";
import { applicantSlice } from "./features/applicant/applicant.slice";

export const store = configureStore({
  reducer: {
    [applicantApi.reducerPath]: applicantApi.reducer,
    [applicantSlice.name]: applicantSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(applicantApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;