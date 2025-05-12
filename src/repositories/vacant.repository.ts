import { ENV } from "@app/constants";
import { TApplicationVacantOverview, TVacant } from "@app/@types/vacant";
import { addToken } from "@app/decorators/repository.decorator";
import BaseRepository from "./base.repository";
import { TListResult, TPaginatorWithQ } from "@app/@types/api";
import { TJobPreview } from "@app/@types/jobs";
import { toUrlParams } from "@app/util/url";

class VacantRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/vacant');
  }

  @addToken()
  createVacant(vacant: TVacant) {
    return this.post('/', vacant);
  }

  @addToken()
  getVacant({ id }: { id: number }) {
    return this.get<TVacant>(`/${id}`);
  }

  @addToken()
  updateVacant(vacantId: number, vacant: TVacant) {
    return this.put(`/${vacantId}`, vacant);
  }

  @addToken()
  getMyVacants(args: TPaginatorWithQ) {
    return this.get<TListResult<TJobPreview>>(toUrlParams(args));
  }

  /* @addToken()
  getApplicationsByVacant({ vacantId }: { vacantId: number }) {
    return this.get<TApplication[]>(`/${vacantId}/applications`);
  } */

  @addToken()
  getVacanciesByApplications({ id }: { id: number }) {
    return this.get<TListResult<TApplicationVacantOverview>>(`/procceses/${id}`);
  }
}

export default new VacantRepository();
