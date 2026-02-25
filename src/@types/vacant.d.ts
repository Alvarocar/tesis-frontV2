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