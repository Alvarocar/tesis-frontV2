import { ENV } from "@app/constants";
import { toUrlParams } from "@app/util/url";
import BaseRepository from "./base.repository";
import { Paginator, TListResult } from "@app/@types/api";
import { addToken } from "@app/decorators/repository.decorator";
import { Recruiter, RecruiterOverview } from "@app/@types/recruiter";

class RecruiterRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/recruiter')
  }

  signin(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in', payload);
  }

  @addToken()
  getInfo() {
    return this.get<Recruiter>('/me');
  }

  async changePassword(token: string, password: string): Promise<void> {
    return this.post('/set-password', { token, password });
  }

  @addToken()
  async getAll(filters: { page: number }) {
    return this.get<TListResult<RecruiterOverview>>(toUrlParams({ page: String(filters.page) }) );
  }

  @addToken()
  createRecruiter(payload: { firstName: string, lastName: string, email: string }) {
    return this.post<void, { firstName: string, lastName: string, email: string }>('/', payload);
  }

  @addToken()
  sendInvitationEmail(email: string) {
    return this.patch('/resend-invitation', { email });
  }
}

export default new RecruiterRepository();
