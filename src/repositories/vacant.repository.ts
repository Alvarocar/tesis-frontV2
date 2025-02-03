import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { TVacant } from "@app/@types/vacant";
import { addToken } from "@app/decorators/repository.decorator";

class VacantRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/vacant');
  }

  @addToken()
  createVacant(vacant: TVacant) {
    return this.post('/', vacant);
  }
}

export default new VacantRepository();
