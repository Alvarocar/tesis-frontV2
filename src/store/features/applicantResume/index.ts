import { ENV, HTTP_METHODS } from "@app/constants";
import { isEmpty } from "lodash";
import { RootState } from "@app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResumeOverview } from "@app/@types/resume.types";

export const applicantResumeApi = createApi({
  reducerPath: "applicantResume",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENV.API_HOST}/v1/resume`,
    prepareHeaders(headers, { getState }) {
      const { applicantSlide } = getState() as RootState;
      if (applicantSlide.token != null && !isEmpty(applicantSlide.token)) {
        headers.set("Authorization", applicantSlide.token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMyResumes: build.query<IResumeOverview[], void>({
      query: () => ({
        method: HTTP_METHODS.GET,
        url: "",
      }),
    }),
    createNewResume: build.mutation<{ id: number }, { title: string }>({
      query: ({ title }) => ({
        url: "",
        method: HTTP_METHODS.POST,
        body: {
          title,
        },
      }),
    }),
    getResumeById: build.query<unknown, number>({
      query: (id) => ({
        url: `/${id}`,
        method: HTTP_METHODS.GET,
      })
    })
  }),
});

export const {
  useGetMyResumesQuery,
  useGetResumeByIdQuery,
  useCreateNewResumeMutation,
} = applicantResumeApi;
