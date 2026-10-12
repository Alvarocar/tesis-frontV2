import useSWR from "swr"
import { Header } from "@app/modules/common/header"
import { JobDetail } from "@app/modules/job/JobDetail"
import jobRepository from "@app/repositories/job.repository"
import { NotFound } from "@app/modules/common/error/NotFound"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"

type Props = {
  params: { jobSlug: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const JobById: React.FC<Props> = ({ params }) => {
  const { isLoading, error, data } = useSWR(isValidSlug(params.jobSlug) ? { jobSlug: params.jobSlug } : null, jobRepository.getJobDetail.bind(jobRepository))
  if (!isValidSlug(params.jobSlug)) return <NotFound />
  
  if (isLoading) return <DotsLoader />
  
  if (error || !data) return <NotFound />

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <JobDetail job={data} />
      </main>
    </div>
  )
}

export default JobById;
