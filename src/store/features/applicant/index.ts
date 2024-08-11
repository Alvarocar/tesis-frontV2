import { ENV } from "@app/constants";
import { HTTP_METHODS } from "@app/constants/http.constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CandidateSignupBody, ICandidateResponse } from "./applicant.types";
import { RootState } from "@app/store";
import { isEmpty } from "lodash";
import { ICandidate } from "@app/@types/candidate.types";

export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENV.API_HOST}/v1/applicants`,
    prepareHeaders(headers, { getState }) {
      const { applicantSlide } = getState() as RootState;
      if (applicantSlide.token != null && !isEmpty(applicantSlide.token)) {
        headers.set("Authorization", applicantSlide.token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    createApplicant: build.mutation({
      query: (candidate: CandidateSignupBody) => ({
        url: "/sign-up",
        body: candidate,
        method: HTTP_METHODS.POST,
      }),

      transformResponse: (resp: ICandidateResponse) => resp.data,
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

      transformResponse: (resp: ICandidateResponse) => resp.data,
    }),

    getApplicant: build.query<ICandidate, void>({
      query: () => ({
        method: HTTP_METHODS.GET,
        url: "",
      }),
    }),

    patchPersonalInfo: build.mutation<
      ICandidate,
      {
        name: string;
        identification: string;
        phone_number: string;
        /**
         * @format DD-MM-YYYY
         */
        birth_date: string;
        direction: string;
      }
    >({
      query: (body) => ({
        method: HTTP_METHODS.PATCH,
        url: "/personal-info",
        body,
      }),
    }),
  }),
});

export const {
  useCreateApplicantMutation,
  useSigninApplicantMutation,
  useGetApplicantQuery,
  usePatchPersonalInfoMutation,
} = applicantApi;
