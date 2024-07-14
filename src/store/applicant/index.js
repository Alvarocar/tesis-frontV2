import { ENV } from "@app/constants";
import { HTTP_METHODS } from "@app/constants/http.constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${ENV.API_HOST}/v1/applicants` }),
  endpoints: (build) => ({
    createApplicant: build.mutation({
      /**
       *
       * @param {object} candidate
       * @param {string} candidate.email
       * @param {string} candidate.name
       * @param {string} candidate.password
       */
      query: (candidate) => ({
        url: "/sign-up",
        body: candidate,
        method: HTTP_METHODS.POST,
      }),

      transformResponse: (resp) => resp.data,
    }),

    signinApplicant: build.mutation({
      /**
       *
       * @param {object} candidate
       * @param {string} candidate.email
       * @param {string} candidate.password
       */
      query: (candidate) => ({
        method: HTTP_METHODS.PUT,
        body: candidate,
        url: "/sign-in",
      }),

      transformResponse: (resp) => {
        return resp.data;
      },
    }),
  }),
});

export const { useCreateApplicantMutation, useSigninApplicantMutation } =
  applicantApi;
