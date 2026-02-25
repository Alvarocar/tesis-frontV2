import useSWR from "swr"
import { TJobStatus } from "@app/enums/jobs.enum"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import { useJobFilters } from "@app/hooks/useJobFilters"
import { Header } from "@app/modules/common/header"
import { JobCard } from "@app/modules/job/JobCard"
import JobPagination from "@app/modules/job/JobPagination/JobPagination.component"
import jobRepository from "@app/repositories/job.repository"

type Props = {
  params: { jobSlug: string }
}

const JobById: React.FC<Props> = ({ params }) => {
  const { filters } = useJobFilters()
  const { data } = useSWR({ type: "vacant-archived",  ...filters, status: TJobStatus.ARCHIVED }, jobRepository.getJobs.bind(jobRepository))
  if (!data) return <DotsLoader />

  return (
    <div className="h-screen">
    <Header />
    {data.result.length === 0 ? (
      <div className="h-[70vh] flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl font-medium">No se encontraron vacantes archivadas</h2>
        <p className="text-gray-500">Parece que no has archivado ninguna vacante aún.</p>
      </div>
    ) : (
    <div className="max-w-screen-2xl min-h-[70vh] mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
    )}
      {data.result.length > 0 && <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />}
    </div>
  )
}

export default JobById;
