import { ENV } from "@app/constants";
import { toUrlParams } from "@app/util/url";
import { Paginator, TListResult } from "@app/@types/api";
import { TJobPreview } from "@app/@types/jobs";
import BaseRepository from "./base.repository";

/**
 * this only works be call by applicants.
 */
class JobRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/job')
  }

  getJobs(args: Paginator) {
    return this.get<TListResult<TJobPreview>>(toUrlParams(args))
  }
}

export default new JobRepository()
