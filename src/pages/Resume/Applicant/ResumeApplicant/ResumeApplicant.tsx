import useSWR from "swr";
import { Header } from "@app/modules/common/header";
import { NotFound } from "@app/modules/common/error/NotFound";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import resumeRepository from "@app/repositories/resume.repository";
import { EditResume } from "@app/modules/resume/EditResume";

type Props = {
  params: { cvSlug: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

export const ResumeApplicant: React.FC<Props> = ({ params }) => {

  const { error, isLoading } = useSWR(isValidSlug(params.cvSlug) ? { resumeId: params.cvSlug } : null, resumeRepository.getDetail.bind(resumeRepository))

  if (!isValidSlug(params.cvSlug)) return <NotFound />

  if (error) return <NotFound />

  if (isLoading) return <DotsLoader />

  return (
    <>
      <Header />
      <EditResume /> 
    </>
  )

}

export default ResumeApplicant;
