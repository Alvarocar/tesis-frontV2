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
    return this.get<TResume>(`/${resumeId}`);
  }

  @addToken()
  patchAboutMe(payload: { about_me: string, resume_id: number }) {
    return this.patch('/about_me', payload);
  }

  @addToken()
  patchSkills(payload: { skills: TResume.ISkill[], resume_id: number }) {
    return this.patch(`/skill/${payload.resume_id}`, payload.skills);
  }

  @addToken()
  patchLanguages(params: { languages: TResume.ILanguage[], resumeId: number }) {
    return this.patch(`/language/${params.resumeId}`, params.languages);
  }

  @addToken()
  patchEducation(params: { education: TResume.IEducation, resume_id: number }) {
    return this.patch(`/education/${params.resume_id}`, params.education)
  }
}

export default new ResumeRepository();
