import { useId } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { TResume } from "@app/@types/resume";
import { formatDate, parseDate } from "@app/util/date/dateParser.util";
import { Form } from "@app/modules/common/form";
import { Checkbox } from "@app/components/ui/checkbox";
import { DatePicker } from "@app/modules/common/datePicker";
import { Textarea } from "@app/components/ui/textarea";
import { Label } from "@app/components/ui/label";
import classNames from "classnames";
import { stubUndefined } from "@app/util/stub";
import useMutate from "@app/hooks/useMutation.hook";
import resumeRepository from "@app/repositories/resume.repository";
import { useResumeContext } from "@app/context/resume.context";
import { toast } from "@app/hooks/use-toast";
import { Button } from "@app/components/ui/button";

type Props = {
  experience?: TResume.IExperience;
  onFinish?: VoidFunction;
}

type FormData = {
  id?: number;
  rol: string;
  company: string;
  start_date: Date;
  end_date?: Date;
  keep_working: boolean;
  description: string;
}

const { InputField } = Form

const maxDate = new Date();

const ExperienceForm: React.FC<Props> = ({ experience, onFinish = stubUndefined }) => {
  
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      id: experience?.id,
      company: experience?.company,
      description: experience?.description,
      rol: experience?.rol,
      keep_working: experience?.keep_working,
      start_date: parseDate(experience?.start_date),
      end_date: parseDate(experience?.end_date),
    }
  });

  const { refresh, resume_id } = useResumeContext();

  const { mutate, isLoading } = useMutate(resumeRepository.patchExperience.bind(resumeRepository));

  const checkId = useId()
  
  const send: SubmitHandler<FormData> = async (data) => {
    const [,error] = await mutate({ resume_id, experience: {
      ...data,
      start_date: formatDate(data.start_date) ?? '',
      end_date: formatDate(data.end_date),
    } })

    if (error) return;

    refresh();
    toast({ 
      title: 'Actualizado',
     })
    onFinish();
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium" >{experience ? 'Editar Experiencia': 'Agregar Experiencia'}</legend>
      <fieldset>
      <InputField
          label="Rol en la compañía"
          classNameWrapper="mb-4"
          error={errors.rol}
          {...register("rol", {
            required: "Campo requerido",
          })}
        />
        <InputField
          label="Nombre de la Compañía"
          error={errors.company}
          {...register("company", {
            required: "Campo requerido",
          })}
        />
        <div className="mt-4">
          <Label>Descripción del rol desempañado</Label>  
          <Textarea
            {...register('description')}
            className={classNames("bg-white resize-none h-52 focus-visible:outline-0 focus-visible:border-0", { 'border border-red-500': errors.description })}
          />
        </div>
        <div className="py-4 px-2 flex gap-6 items-center" >
          <Controller
            name="keep_working"
            control={control}
            render={({ field }) => (
              <Checkbox id={checkId} checked={field.value} onChange={field.onChange}/>

            )}
          />
          <label htmlFor={checkId}>¿Aun sigue trabajando ahi?</label>
        </div>
        <section className="flex flex-col gap-6 w-fit mx-auto sm:flex-row">
          <div>
            <label className="font-medium text-sm">Fecha de ingreso</label>
            <Controller
              name="start_date"
              control={control}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  label="Fecha de ingreso"
                  error={formState.errors.start_date}
                  endMonth={maxDate}
                />
              )}
            />
          </div>
          <div>
          <label className="font-medium text-sm">Fecha de finalización</label>
            <Controller
              name="end_date"
              control={control}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  label="Fecha de finalización"
                  error={formState.errors.end_date}
                  endMonth={maxDate}
                />
              )}
            />
          </div>
        </section>
      </fieldset>
      <footer className="pt-4 flex justify-center">
        <Button type="submit" >Guardar</Button>
      </footer>
    </form>
  )
}

export default ExperienceForm;
