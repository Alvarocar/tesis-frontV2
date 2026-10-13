import useSWR from "swr"
import vacantRepository from "@app/repositories/vacant.repository"
import { useJobFilters } from "@app/hooks/useJobFilters"
import { Header } from "@app/modules/common/header"
import { JobCard } from "@app/modules/job/JobCard"
import JobGridSkeleton from "@app/modules/job/JobCard/JobGridSkeleton"
import JobPagination from "@app/modules/job/JobPagination/JobPagination.component"
import { NoJobResult } from "@app/modules/job/NoJobResult/NoJobResult"
import { GenericError } from "@app/modules/common/error/GenericError"
import { TJobPreview } from "@app/@types/jobs"
import { TJobStatus } from "@app/enums/jobs.enum"
import { TVacancyListResult } from "@app/@types/vacant"

type Props = {
  params: { jobSlug: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const JobById: React.FC<Props> = ({ params }) => {
  const { filters } = useJobFilters()
  const { data, error, isLoading, mutate } = useSWR<TVacancyListResult<TJobPreview>>(
    { type: "vacant", status: TJobStatus.ENABLE, ...filters },
    vacantRepository.getMyVacants.bind(vacantRepository)
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
            title="No pudimos cargar tus vacantes"
            message="Ocurrió un error al obtener tus vacantes. Inténtalo de nuevo."
          />
        ) : data.data.length === 0 ? (
          <NoJobResult className="flex-1" />
        ) : (
          <>
            <div className="list-enter mx-auto grid max-w-7xl grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-x-5 gap-y-8 px-4 py-10 sm:px-6">
              {data.data.map((job: TJobPreview) => (
                <JobCard key={job.id} job={job} className="justify-self-center" />
              ))}
            </div>
            <JobPagination currentPage={Number(data.currentPage)} totalPages={data.totalPages} />
          </>
        )}
      </main>
    </div>
  )
}

export default JobById;
