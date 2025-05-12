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
    <div className="max-w-screen-2xl mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
      <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </div>
  )
}

export default JobById;
