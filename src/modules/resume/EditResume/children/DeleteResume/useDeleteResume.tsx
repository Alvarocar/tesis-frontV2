import useMutate from "@app/hooks/useMutation.hook"
import { ROUTES_PATHS } from "@app/constants/routes.constant";
import ResumeRepository from "@app/repositories/resume.repository"
import { toast } from "@app/util/toast"
import { useLocation } from "wouter"
 
export const useDeleteResume = () => {
  const { mutate, isLoading } = useMutate(ResumeRepository.deleteResume.bind(ResumeRepository))
  const [, setLocation] = useLocation()

  const handleDelete = async (id: number) => {
    const [, error] = await mutate(id);
    if (error) return toast.failed("Error", error.message ?? "Hubo un error en la solicitud, vuelva a intentar");
    toast.successful(
      'Registro Eliminado',
      'La hoja de vida ha sido eliminada',
    )
    setLocation(ROUTES_PATHS.HOME);
  }

  return {
    deleteResume: handleDelete,
    isLoading,
  }
}