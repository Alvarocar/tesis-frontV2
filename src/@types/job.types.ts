export interface IJobPreview {
  id: number,
  company: string,
  title: string,
  salary?: number,
  type: string,
}

export interface IJobDetail {
  description: string;
  experienceYears: number;
  id: number;
  jobType: string;
  modificationDate: string;
  salaryOffer: number;
  title: string;
  company: string;
}
