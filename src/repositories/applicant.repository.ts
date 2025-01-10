import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { ICandidate } from "@app/@types/applicant";
import { TApiResponse } from '@app/@types/api';
import { addToken } from "@app/decorators/repository.decorator";


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

  @addToken()
  getApplicant() {
    return this.get<ICandidate>('')
  }

  @addToken()
  patchPersonalInfo(payload: ICandidate.PersonalInfo) {
    return this.patch('/personal-info', payload);
  }
}

export default new ApplicantRepository();