import classNames from "classnames";
import { useForm } from "react-hook-form";
import { BriefcaseIcon } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { Textarea } from "@app/components/ui/textarea";

type Props = {
  description: string;
}

type FormData = {
  about_me: string;
}

const ResumeDescriptionForm: React.FC<Props> = ({
  description,
}) => {
  
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      about_me: description,
    }
  })

  const send = () => {

  }
  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium mb-2 flex gap-2" >
        <BriefcaseIcon className="w-5 h-5 my-auto" />
        Descripción Profesional
        </legend>
      <fieldset className="my-4">
        <Textarea

          {...register('about_me', {
            required: 'Campo requerido',
          })}
          className={classNames("bg-white resize-none h-52 focus-visible:outline-0 focus-visible:border-0", { 'border border-red-500': errors.about_me })}
        />
        {errors.about_me ? <p className="text-red-500">{errors.about_me.message}</p> : null}
      </fieldset>
      <Button>Guardar</Button>
    </form>
  )
}

export default ResumeDescriptionForm;
