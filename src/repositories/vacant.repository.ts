import { ENV } from "@app/constants";
import { TVacant } from "@app/@types/vacant";
import { addToken } from "@app/decorators/repository.decorator";
import BaseRepository from "./base.repository";

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
}

export default new VacantRepository();
