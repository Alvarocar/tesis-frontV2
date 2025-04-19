import ResumeRepository from "@app/repositories/resume.repository";
import { useResumeContext } from "@app/context/resume.context";
import useMutate from "@app/hooks/useMutation.hook";
import { toast } from "@app/util/toast";

export const useDeleteExperience = () => {
  const { mutate, isLoading } = useMutate(ResumeRepository.deleteExperience.bind(ResumeRepository));
  const { refresh, resume_id } = useResumeContext();
  const handleDeleteExperience = async (id: number) => {
    const [, error] = await mutate(resume_id, id);
    if (error) return toast.failed("Error", error.message ?? "Hubo un error en la solicitud, vuelva a intentar");
    refresh();
    toast.successful(
      'Registro Eliminado',
      'La experiencia ha sido eliminada',
    )
  }

  return {
    deleteExperience: handleDeleteExperience,
    isLoading
  }
}
