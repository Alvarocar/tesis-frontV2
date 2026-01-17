import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";
import { IApplicationDetail } from "@app/@types/application";
import { TApplicationVacantOverview } from "@app/@types/vacant";
import { TListResult } from "@app/@types/api";

class ApplicationRepository extends BaseRepository {
  
  constructor() {
    super(ENV.API_HOST, '/v1/application')
  }
  
  @addToken()
  apply(vacantId: number, resumeId: number) {
    return this.post(`/apply/${vacantId}/${resumeId}`, {});
  }

  @addToken()
  getApplicationDetail({ applicationDetailId }: { applicationDetailId: number }) {
    return this.get<IApplicationDetail>(`/${applicationDetailId}`);
  }

  @addToken()
  getApplicationsByVacant({ id: vacantId }: { id: number }) {
    return this.get<TListResult<TApplicationVacantOverview>>(`/procceses/${vacantId}`);
  }
}

export default new ApplicationRepository();
