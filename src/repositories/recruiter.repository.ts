import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";
import { Recruiter } from "@app/@types/recruiter";

class RecruiterRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/recruiter')
  }

  signin(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in', payload);
  }

  @addToken()
  getInfo() {
    return this.get<Recruiter>('/');
  }

}

export default new RecruiterRepository();
