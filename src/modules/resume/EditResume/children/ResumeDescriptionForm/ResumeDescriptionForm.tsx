import classNames from "classnames";
import { useForm } from "react-hook-form";
import { BriefcaseIcon } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { Textarea } from "@app/components/ui/textarea";
import useMutate from "@app/hooks/useMutation.hook";
import resumeRepository from "@app/repositories/resume.repository";
import { useResumeContext } from "@app/context/resume.context";
import { toast } from "@app/hooks/use-toast";

type Props = {
  description: string;
}

type FormData = {
  aboutMe: string;
}

const ResumeDescriptionForm: React.FC<Props> = ({
  description,
}) => {
  
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      aboutMe: description,
    }
  })

  const { refresh, resume_id } = useResumeContext()

  const { mutate, isLoading } = useMutate(resumeRepository.patchAboutMe.bind(resumeRepository))

  const send = async (payload: FormData) => {
    const [,error] = await mutate({ ...payload, resumeId: resume_id });
    if (error) return;
    refresh()
    toast({ title: 'Actualizado' })
  }
  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium mb-2 flex gap-2" >
        <BriefcaseIcon className="w-5 h-5 my-auto" />
        Descripción Profesional
        </legend>
      <fieldset className="my-4">
        <Textarea

          {...register('aboutMe', {
            required: 'Campo requerido',
          })}
          className={classNames("bg-white resize-none h-52 focus-visible:outline-0 focus-visible:border-0", { 'border border-red-500': errors.aboutMe })}
        />
        {errors.aboutMe ? <p className="text-red-500">{errors.aboutMe.message}</p> : null}
      </fieldset>
      <Button disabled={isLoading}>Guardar</Button>
    </form>
  )
}

export default ResumeDescriptionForm;
