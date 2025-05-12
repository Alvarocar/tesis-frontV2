export type TVacant = {
  title: string;
  description: string;
  salary: number;
  jobType: 'Tiempo Completo' | 'Prácticas';
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
