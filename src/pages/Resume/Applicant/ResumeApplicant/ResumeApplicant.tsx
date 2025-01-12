import useSWR from "swr";
import { Header } from "@app/modules/common/header";
import { NotFound } from "@app/modules/common/error/NotFound";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import resumeRepository from "@app/repositories/resume.repository";
import { EditResume } from "@app/modules/resume/EditResume";
import { ResumeContext } from "@app/context/resume.context";
import { useMemo } from 'react';

type Props = {
  params: { cvSlug: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

export const ResumeApplicant: React.FC<Props> = ({ params }) => {

  const { data, error, isLoading, mutate } = useSWR(isValidSlug(params.cvSlug) ? { resumeId: params.cvSlug } : null, resumeRepository.getDetail.bind(resumeRepository))

  const value = useMemo(() => ({ refresh: mutate, resume_id: Number(params.cvSlug), resume: data }), [mutate, params.cvSlug, data])
  
  if (!isValidSlug(params.cvSlug)) return <NotFound />

  if (error) return <NotFound />

  if (isLoading || !data) return <DotsLoader />


  return (
    <ResumeContext.Provider value={value}>
      <Header />
      <EditResume resume={data} /> 
    </ResumeContext.Provider>
  )

}

export default ResumeApplicant;
