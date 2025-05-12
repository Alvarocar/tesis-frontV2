import useSWR from "swr"
import { Header } from "@app/modules/common/header"
import { NotFound } from "@app/modules/common/error/NotFound"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import applicationRepository from "@app/repositories/application.repository"

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
    </>
  )
}

export default ApplicationById

