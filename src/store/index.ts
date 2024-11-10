import { configureStore } from "@reduxjs/toolkit";
import { applicantApi } from "./features/applicant";
import { applicantSlice } from "./features/applicant/applicant.slice";
import { applicantResumeApi } from "./features/applicantResume";
import { applicantResumeSlice } from './features/applicantResume/applicantResume.slice';
import { jobApi } from "./features/job";

export const store = configureStore({
  reducer: {
    [applicantApi.reducerPath]: applicantApi.reducer,
    [applicantSlice.name]: applicantSlice.reducer,
    [applicantResumeApi.reducerPath]: applicantResumeApi.reducer,
    [applicantResumeSlice.name]: applicantResumeSlice.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicantApi.middleware)
      .concat(applicantResumeApi.middleware)
      .concat(jobApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
