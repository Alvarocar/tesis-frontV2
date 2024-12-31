
export type TJob = {
  description: string;
  experienceYears: number;
  id: number;
  jobType: string;
  modificationDate: string;
  salaryOffer: number;
  title: string;
  company: string;
}

export type TJobPreview = Pick<TJob, 'id' | 'company' | 'title' | 'salaryOffer' | 'jobType'>;
