import useSWR from "swr"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import vacantRepository from "@app/repositories/vacant.repository"
import { useJobFilters } from "@app/hooks/useJobFilters"
import { Header } from "@app/modules/common/header"
import { JobCard } from "@app/modules/job/JobCard"
import JobPagination from "@app/modules/job/JobPagination/JobPagination.component"

type Props = {
  params: { jobSlug: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const JobById: React.FC<Props> = ({ params }) => {
  const { filters } = useJobFilters()
  const { data } = useSWR({ type: "vacant", ...filters }, vacantRepository.getMyVacants.bind(vacantRepository))
  if (!data) return <DotsLoader />

  return (
    <div className="h-screen">
    <Header />
    {data.result.length === 0 ? (
      <div className="h-[70vh] flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl font-medium">No se encontraron vacantes</h2>
        <p className="text-gray-500">Parece que no has creado ninguna vacante aún.</p>
      </div>
    ) : (
    <div className="max-w-screen-2xl mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
    )}
      {data.result.length > 0 && <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />}
    </div>
  )
}

export default JobById;
