import useSWR from "swr";
import { Header } from "@app/modules/common/header";
import { ProcessList } from "@app/modules/process/ProcessList";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import JobPagination from "@app/modules/job/JobPagination/JobPagination.component";
import applicationRepository from "@app/repositories/application.repository";

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const Procesos: React.FC<Props> = ({ params }) => {
  const { isLoading, data } = useSWR(isValidSlug(params.id) ? { id: params.id, name: "procesos" } : undefined, applicationRepository.getApplicationsByVacant.bind(applicationRepository))

  if (isLoading || !data) return <DotsLoader />

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col pb-10 focus:outline-none"
      >
        <ProcessList className="flex-1" data={data.result} />
        <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
      </main>
    </div>
  )
}

export default Procesos
