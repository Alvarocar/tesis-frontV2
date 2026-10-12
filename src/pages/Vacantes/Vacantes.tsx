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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1 focus:outline-none" tabIndex={-1}>
      {data.result.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-2xl font-medium text-foreground">No se encontraron vacantes</h2>
          <p className="text-secondary">Parece que no has creado ninguna vacante aún.</p>
        </div>
      ) : (
      <div className="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-x-5 gap-y-8 px-4 py-10 sm:px-6">
        {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
      </div>
      )}
        {data.result.length > 0 && <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />}
      </main>
    </div>
  )
}

export default JobById;
