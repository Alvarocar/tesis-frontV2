import useSWR from "swr"
import { TJobStatus } from "@app/enums/jobs.enum"
import { useJobFilters } from "@app/hooks/useJobFilters"
import { Header } from "@app/modules/common/header"
import { JobCard } from "@app/modules/job/JobCard"
import JobGridSkeleton from "@app/modules/job/JobCard/JobGridSkeleton"
import JobPagination from "@app/modules/job/JobPagination/JobPagination.component"
import { NoJobResult } from "@app/modules/job/NoJobResult/NoJobResult"
import { GenericError } from "@app/modules/common/error/GenericError"
import { TListResult } from "@app/@types/api"
import { TJobPreview } from "@app/@types/jobs"
import jobRepository from "@app/repositories/job.repository"

type Props = {
  params: { jobSlug: string }
}

const JobById: React.FC<Props> = ({ params }) => {
  const { filters } = useJobFilters()
  const { data, error, isLoading, mutate } = useSWR<TListResult<TJobPreview>>(
    { type: "vacant-archived", ...filters, status: TJobStatus.ARCHIVED },
    jobRepository.getJobs.bind(jobRepository)
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1 focus:outline-none" tabIndex={-1}>
        {isLoading ? (
          <JobGridSkeleton />
        ) : error || !data ? (
          <GenericError
            onRetry={() => mutate()}
            title="No pudimos cargar tus vacantes archivadas"
            message="Ocurrió un error al obtener tus vacantes archivadas. Inténtalo de nuevo."
          />
        ) : data.result.length === 0 ? (
          <NoJobResult className="flex-1" />
        ) : (
          <>
            <div className="list-enter mx-auto grid min-h-[70vh] max-w-7xl grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-x-5 gap-y-8 px-4 py-10 sm:px-6">
              {data.result.map((job: TJobPreview) => (
                <JobCard key={job.id} job={job} className="justify-self-center" />
              ))}
            </div>
            <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
          </>
        )}
      </main>
    </div>
  )
}

export default JobById;
