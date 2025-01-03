import { useAuth } from "@app/hooks/useAuth.hook"
import { Skeleton } from "@app/components/ui/skeleton";
import applicantRepository from "@app/repositories/applicant.repository"
import useSWR from "swr"

const ApplicantHeader = () => {
  const { token } = useAuth();
  const { data } = useSWR(token, applicantRepository.getApplicant.bind(applicantRepository));

  if (!data) return <Skeleton className="h-10 w-80" />

  return (
    <>
      <h2 className="w-80 text-lg font-medium">Hola! {data.firstName} {data.lastName}</h2>
      <span className="text-sm text-gray-500">Estas son la opciones que tienes disponible</span>
    </>
  )
}

export default ApplicantHeader;
