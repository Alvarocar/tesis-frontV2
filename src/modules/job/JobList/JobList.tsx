import useSWR from "swr";
import { Paginator } from "@app/@types/api";
import { useJobFilters } from "@app/hooks/useJobFilters";
import JobRepository from "@app/repositories/job.repository";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { JobCard } from "../JobCard";

const JobList = () => {
  const { filters, setFilter } = useJobFilters()
  const { data } = useSWR({ ...filters }, JobRepository.getJobs.bind(JobRepository))
  if (!data) return <DotsLoader />
  
  return (
    <div className="max-w-screen-2xl mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
  )
}

export default JobList;
