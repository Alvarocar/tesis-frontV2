
import { useResumeContext } from "@app/context/resume.context";
import useMutate from "@app/hooks/useMutation.hook";
import ResumeRepository from "@app/repositories/resume.repository";
import { toast } from "@app/util/toast";
export const useDeleteStudy = () => {
  
  const { mutate, isLoading } = useMutate(ResumeRepository.deleteEducation.bind(ResumeRepository));
  const { refresh, resume_id } = useResumeContext();
  const handleDeleteStudy = async (id: number) => {
    const [, error] = await mutate(resume_id, id);
    if (error) return toast.failed("Error", error.message ?? "Hubo un error en la solicitud, vuelva a intentar");
    refresh();
    toast.successful(
      'Registro Eliminado',
      'La educación ha sido eliminada',
    )
  }

  return {
    deleteStudy: handleDeleteStudy,
    isLoading
  }
}

