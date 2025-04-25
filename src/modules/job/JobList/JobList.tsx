import useSWR from "swr";
import { Paginator } from "@app/@types/api";
import { useJobFilters } from "@app/hooks/useJobFilters";
import JobRepository from "@app/repositories/job.repository";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { JobCard } from "../JobCard";
import JobPagination from "../JobPagination/JobPagination.component";

const JobList = () => {
  const { filters, setFilter } = useJobFilters()
  const { data, error } = useSWR({ ...filters }, JobRepository.getJobs.bind(JobRepository))
  if (!data) return <DotsLoader />

  return (
    <>
    <div className="max-w-screen-2xl mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
      <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </>
  )
}

export default JobList;
