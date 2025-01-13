import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";

class RecruiterRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/recruiter')
  }

  signin(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in', payload);
  }
}

export default new RecruiterRepository();
