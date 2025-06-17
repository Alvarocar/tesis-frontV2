import { ICandidate } from "./applicant";
import { TResume } from "./resume";
import { TJob } from "./jobs";

export interface IApplicationDetail {
  id: number;
  feedBack: string;
  affinity: number;
  applicant: ICandidate;
  resume: TResume;
  vacancy: TJob;
}