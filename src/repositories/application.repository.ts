import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";

class ApplicationRepository extends BaseRepository {
  
  constructor() {
    super(ENV.API_HOST, '/v1/application')
  }
  
  @addToken()
  apply(vacantId: number, resumeId: number) {
    return this.post(`/apply/${vacantId}/${resumeId}`, {});
  }

}

export default new ApplicationRepository();
