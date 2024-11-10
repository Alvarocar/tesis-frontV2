import { IJobDetail, IJobPreview } from "@app/@types/job.types";
import { ENV, HTTP_METHODS } from "@app/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Paginator = {
  page: number,
  pageSize: number,
}

type ResponsePaginator<T> = {
  currentPage: number,
  totalPages: number,
  result: T,
}

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENV.API_HOST}/v1/job`,
  }),
  endpoints: (build) => ({
    getJobs: build.query<ResponsePaginator<IJobPreview[]>, Paginator>({
      query: (params) => ({
        url: '/',
        params,
        method: HTTP_METHODS.GET
      })
    }),
    getJobDetail: build.query<IJobDetail, number>({
      query: (id) => ({
        url: `/${id}`,
        method: HTTP_METHODS.GET,
      })
    })
  })
})

export const {
  useGetJobsQuery,
  useGetJobDetailQuery,
} = jobApi