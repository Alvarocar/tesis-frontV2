import useSWR from "swr";
import { TListResult } from "@app/@types/api";
import { TJobPreview } from "@app/@types/jobs";
import { useJobFilters } from "@app/hooks/useJobFilters";
import JobRepository from "@app/repositories/job.repository";
import { JobCard } from "../JobCard";
import JobGridSkeleton from "../JobCard/JobGridSkeleton";
import JobPagination from "../JobPagination/JobPagination.component";
import { NoJobResult } from "../NoJobResult/NoJobResult";
import { GenericError } from "@app/modules/common/error/GenericError";

const JobList = () => {
  const { filters } = useJobFilters()
  const { data, error, isLoading, mutate } = useSWR<TListResult<TJobPreview>>(
    { ...filters },
    JobRepository.getJobs.bind(JobRepository)
  )

  if (isLoading) return <JobGridSkeleton />

  if (error || !data) {
    return (
      <GenericError
        onRetry={() => mutate()}
        title="No pudimos cargar las ofertas"
        message="Ocurrió un error al obtener las vacantes. Revisa tu conexión e inténtalo de nuevo."
      />
    )
  }

  if (data.result.length === 0) {
    return <NoJobResult className="flex-1" />
  }

  return (
    <>
      <div className="list-enter mx-auto grid min-h-[70vh] max-w-7xl grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-x-5 gap-y-8 px-4 py-10 sm:px-6">
        {data.result.map((job: TJobPreview) => (
          <JobCard key={job.id} job={job} className="justify-self-center" />
        ))}
      </div>
      <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </>
  )
}

export default JobList;
