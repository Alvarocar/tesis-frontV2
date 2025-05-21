import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@app/components/ui/button";
import { Form } from "@app/modules/common/form";
import { useContext, useEffect } from "react";
import { ResumeContext } from "@app/context/resume.context";
import useMutate from "@app/hooks/useMutation.hook";
import resumeRepository from "@app/repositories/resume.repository";
import { toast } from "@app/hooks/use-toast";

const { InputField } = Form

type FormData = {
  title: string;
}

const TitleResume: React.FC = () => {
  const { resume, resume_id } = useContext(ResumeContext)
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: resume?.title
    }
  })

  const { mutate, isLoading } = useMutate((data: FormData) => {
    return resumeRepository.updateTitle({ title: data.title, id: resume_id })
  })

  useEffect(() => {
    if (!resume) return;
    setValue('title', resume.title)
  }, [resume?.title])

  const send = async (data: FormData) => {
    const [, error] = await mutate(data)
    if (error) return;
    toast({ title: 'Actualizado' })
  }
  return (
        <form onSubmit={handleSubmit(send)} className="flex gap-2 mb-4">
            <InputField classNameWrapper="w-full" label="Nombre del currículum" {...register('title')} />
            <Button disabled={isLoading} className="self-end" type="submit">
              <Pencil/>
              Editar
            </Button>
        </form>
    )
}

export default TitleResume;
