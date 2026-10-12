import { TJobStatus } from "@app/enums/jobs.enum";
import { TPaginatorWithQ } from "./api";

export type TVacant = {
  title: string;
  description: string;
  salary: number;
  jobType: 'Tiempo Completo' | 'Prácticas';
  editable: boolean;
}

export type TApplicationVacantOverview = {
  id: number;
  affinity: number;
  feedBack: string;
  applicant: {
    id: number;
    firstName: string;
    lastName: string;
  }
}

export interface TVacancySearch extends TPaginatorWithQ {
  status: TJobStatus;
}

/**
 * Response shape of GET /v1/vacancy (recruiter's "my vacants" list).
 *
 * NOTE: this endpoint uses `data` as the items key, not `result` like
 * the rest of the API (e.g. /v1/job). `currentPage` comes as a string.
 * Keep in sync with the backend if it ever aligns with the others.
 */
export interface TVacancyListResult<T> {
  data: T[];
  currentPage: string;
  totalPages: number;
}