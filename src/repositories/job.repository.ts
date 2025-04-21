import { ENV } from "@app/constants";
import { toUrlParams } from "@app/util/url";
import { TListResult, TPaginatorWithQ } from "@app/@types/api";
import { TJob, TJobPreview } from "@app/@types/jobs";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";

/**
 * this only works be call by applicants.
 */
class JobRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/job')
  }

  getJobs(args: TPaginatorWithQ) {
    return this.get<TListResult<TJobPreview>>(toUrlParams(args))
  }

  getJobDetail(args: { jobSlug: string}) {
    return this.get<TJob>(`/${args.jobSlug}`)
  }

  @addToken()
  isApplied({ jobId }: { jobId: number }) {
    return this.get(`/applied/${jobId}`);
  }
}

export default new JobRepository()
