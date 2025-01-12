import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@app/components/ui/checkbox";
import { DatePicker } from "@app/modules/common/datePicker";
import { useResumeContext } from "@app/context/resume.context";
import resumeRepository from "@app/repositories/resume.repository";
import { formatDate, parseDate } from "@app/util/date/dateParser.util";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { Form } from "@app/modules/common/form";
import { stubUndefined } from "@app/util/stub";
import { toast } from "@app/hooks/use-toast";
import { TResume } from "@app/@types/resume";

type Props = {
  study?: TResume.IEducation,
  onFinish?: VoidFunction,
}

const { InputField } = Form

type FormData = {
  id: number;
  institute: string;
  title: string;
  keep_study: boolean;
  start_date: Date;
  end_date: Date;
};

const maxDate = new Date();

const StudyForm: React.FC<Props> = ({ 
  study,
  onFinish = stubUndefined,
}) => {

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      id: study?.id,
      institute: study?.institute,
      keep_study: study?.keep_study,
      title: study?.title,
      start_date: parseDate(study?.start_date),
      end_date: parseDate(study?.end_date),
    }
  });

  const checkId = useId();
  const { resume_id, refresh } = useResumeContext();
  const { mutate, isLoading } = useMutate(resumeRepository.patchEducation.bind(resumeRepository))

  const send = async (data: FormData) => {
    const [, error] = await mutate({ 
      resume_id,
      education: {
        ...data,
        start_date: formatDate(data.start_date) ?? '',
        end_date: formatDate(data.end_date),
      }
     })
     if (error) return;
     refresh();
     toast({
      title: 'Actualizado',
     })
     onFinish();
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium" >{study ? 'Editar Educación': 'Agregar Educación'}</legend>
      <fieldset>
      <InputField
          label="Titulo obtenido"
          classNameWrapper="mb-4"
          error={errors.title}
          {...register("title", {
            required: "Campo requerido",
          })}
        />
        <InputField
          label="Instituto en donde estudiaste"
          error={errors.title}
          {...register("institute", {
            required: "Campo requerido",
          })}
        />
        <div className="py-4 px-2 flex gap-6 items-center" >
          <Controller 
            name="keep_study"
            control={control}
            render={({ field }) => (
              <Checkbox id={checkId} checked={field.value} onChange={field.onChange}/>

            )}
          />
          <label htmlFor={checkId}>¿Aun sigue estudiando?</label>
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
      <footer className="pt-5 flex justify-center">
        <Button type="submit" disabled={isLoading} >Guardar</Button>
      </footer>
    </form>
  )
}

export default StudyForm
