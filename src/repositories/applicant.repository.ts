import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { ICandidate } from "@app/@types/applicant";
import { TApiResponse } from '@app/@types/api';


class ApplicantRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/applicants')
  }

  signup(payload: ICandidate.SignupPayload) {
    return this.post<TApiResponse.Token<ICandidate>, ICandidate.SigninPayload>('/sign-up', payload);
  }

  signin(payload: ICandidate.SigninPayload) {
    return this.put<TApiResponse.Token<ICandidate>, ICandidate.SigninPayload>('/sign-in', payload);
  }

  getApplicant() {
    return this.get<ICandidate>('')
  }

  updateApplicant(payload: Partial<ICandidate.PersonalInfoPayload>) {
    this.patch<ICandidate.PersonalInfoPayload, Partial<ICandidate.PersonalInfoPayload>>('/personal-info', payload);
  }
}

export default new ApplicantRepository();