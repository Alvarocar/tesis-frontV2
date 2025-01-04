import { addToken } from "@app/decorators/repository.decorator";
import BaseRepository from "./base.repository";
import { TResume } from "@app/@types/resume";
import { ENV } from "@app/constants";

class ResumeRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/resume')
  }

  @addToken()
  getMyResumes() {
    return this.get<TResume.Overview[]>('/');
  }

  @addToken()
  createResume(payload: { title: string }) {
    return this.post<{ id: number }, { title: string }>('/', payload)
  }

  @addToken()
  getDetail({ resumeId }: { resumeId: number }) {
    return this.get(`/${resumeId}`);
  }
}

export default new ResumeRepository();
