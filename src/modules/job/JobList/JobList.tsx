import useSWR from "swr";
import { Paginator } from "@app/@types/api";
import JobRepository from "@app/repositories/job.repository";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { JobCard } from "../JobCard";

const JobList = () => {
  const { data } = useSWR({ page: '1' } as Paginator, JobRepository.getJobs.bind(JobRepository))
  if (!data) return <DotsLoader />
  
  return (
    <div className="max-w-screen-2xl min-w- mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {data.result.map(job => <JobCard key={job.id} job={job}  className="justify-self-center" />)}
    </div>
  )
}

export default JobList;
