import useSWR from "swr"
import { ArrowLeft } from "lucide-react"
import { Link } from "wouter"
import { Header } from "@app/modules/common/header"
import { NotFound } from "@app/modules/common/error/NotFound"
import { GenericError } from "@app/modules/common/error/GenericError"
import applicationRepository from "@app/repositories/application.repository"
import { ResumeView } from "@app/modules/process/ResumeView/ResumeView"
import { VacancyContext } from "@app/modules/process/VacancyContext"
import { AffinityScore } from "@app/modules/process/AffinityScore"
import { ApplicationDetailSkeleton } from "@app/modules/process/ApplicationDetailSkeleton"
import { IApplicationDetail } from "@app/@types/application"
import { formatFeedBack } from "@app/util/string"

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const ApplicationById: React.FC<Props> = ({ params }) => {
  const { isLoading, error, data, mutate } = useSWR<IApplicationDetail>(
    isValidSlug(params.id) ? { applicationDetailId: params.id } : null,
    applicationRepository.getApplicationDetail.bind(applicationRepository)
  )

  if (!isValidSlug(params.id)) return <NotFound />

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <ApplicationDetailSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main
          id="main"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          <GenericError
            onRetry={() => mutate()}
            title="No pudimos cargar la postulación"
            message="Ocurrió un error al obtener los datos de esta postulación. Inténtalo de nuevo."
          />
        </main>
      </div>
    )
  }

  if (!data) return <NotFound />

  // The /procesos/:id route shows the applications for a given vacancy, so
  // we need the vacancy id. Fall back to /vacantes if the backend omits
  // `vacancy` from this response (which would otherwise build a
  // `/procesos/undefined` link that 404s).
  const backHref = data.vacancy?.id
    ? `/procesos/${data.vacancy.id}`
    : "/vacantes";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8 focus:outline-none sm:px-6"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al proceso
        </Link>

        {data.vacancy ? (
          <VacancyContext vacancy={data.vacancy} />
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface p-5 text-sm text-secondary">
            No se pudo cargar el contexto de la vacante para esta postulación.
          </div>
        )}

        <section className="grid gap-4 lg:grid-cols-[minmax(0,_1fr)_18rem]">
          <div className="space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">
              Retroalimentación de la Aplicación
            </h2>
            <div className="text-secondary">
              {formatFeedBack(data.feedBack)}
            </div>
          </div>
          <AffinityScore affinity={data.affinity} />
        </section>

        <ResumeView resume={data.resume} applicant={data.applicant} />
      </main>
    </div>
  )
}

export default ApplicationById
