import useSWR from "swr";
import { Header } from "@app/modules/common/header";
import { ProcessList } from "@app/modules/process/ProcessList";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import vacantRepository from "@app/repositories/vacant.repository";
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
        <main className="min-h-screen flex flex-col pb-10">
          <Header />
          <ProcessList className="flex-1" data={data.result} />
          <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />        
        </main>
    )
}

export default Procesos
