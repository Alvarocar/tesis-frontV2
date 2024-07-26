import { ICandidate } from "@app/@types/candidate.types";

export interface CandidateSignupBody {
  email: string;
  name: string;
  password: string;
}

export type ICandidateResponse = {
  data: Required<Omit<ICandidate, "password">>;
  message?: string;
};
