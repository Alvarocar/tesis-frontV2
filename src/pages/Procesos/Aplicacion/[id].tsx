import useSWR from "swr"
import { Header } from "@app/modules/common/header"
import { NotFound } from "@app/modules/common/error/NotFound"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import applicationRepository from "@app/repositories/application.repository"
import { ResumeView } from "@app/modules/process/ResumeView/ResumeView"
import { formatFeedBack, getAffinityColor } from "@app/util/string"
import classNames from "classnames"

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const ApplicationById: React.FC<Props> = ({ params }) => {
  const { isLoading, error, data } = useSWR(isValidSlug(params.id) ? { applicationDetailId: params.id } : null, applicationRepository.getApplicationDetail.bind(applicationRepository))
  if (!isValidSlug(params.id)) return <NotFound />

  if (isLoading) return <DotsLoader />

  if (error || !data) return <NotFound />

  return (
    <>
      <Header />
      <article className="p-10">
       <h1 className="text-2xl text-center mb-6">Vacante: <span className="font-semibold">{data.vacancy.title}</span></h1>
        {/* <VacancyProcess vacancy={data.vacancy} /> */}
        <section className="flex flex-wrap gap-4 justify-around">
          <main className="max-w-2xl p-6 bg-white shadow rounded-lg space-y-8">
            <h2 className="text-2xl font-semibold">Retroalimentación de la Aplicación</h2>
            <p className="whitespace-pre-line">{formatFeedBack(data.feedBack)}</p>
            <p className="font-medium">
              Porcentaje de afinidad:
              <span className={classNames("font-bold", getAffinityColor(data.affinity))}> {data.affinity}</span>
            </p>
          </main>
          <ResumeView resume={data.resume} phoneNumber={data.applicant.phoneNumber} />
        </section>

      </article>
    </>
  )
}

export default ApplicationById

