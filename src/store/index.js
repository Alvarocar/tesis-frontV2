import { configureStore } from "@reduxjs/toolkit";
import { applicantApi } from "./applicant";

export const store = configureStore({
  reducer: {
    [applicantApi.reducerPath]: applicantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(applicantApi.middleware),
});
