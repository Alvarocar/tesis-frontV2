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
import { TResume } from "@app/@types/resume";
import { toast } from "@app/util/toast";

type Props = {
  study?: TResume.IEducation,
  onFinish?: VoidFunction,
}

const { InputField } = Form

type FormData = {
  id: number;
  institute: string;
  title: string;
  keepStudy: boolean;
  startDate: Date;
  endDate: Date;
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
    watch,
  } = useForm<FormData>({
    defaultValues: {
      id: study?.id,
      institute: study?.institute,
      keepStudy: study?.keepStudy,
      title: study?.title,
      startDate: parseDate(study?.startDate),
      endDate: parseDate(study?.endDate),
    },
  });

  const checkId = useId();
  const { resume_id, refresh } = useResumeContext();
  const { mutate, isLoading } = useMutate(resumeRepository.patchEducation.bind(resumeRepository))

  const send = async (data: FormData) => {
    const [, error] = await mutate({ 
      resume_id,
      education: {
        ...data,
        startDate: formatDate(data.startDate) ?? '',
        endDate: formatDate(data.endDate),
      }
     })
     if (error) return;
     refresh();
     toast.successful('Registro Actualizado');
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
          error={errors.institute}
          {...register("institute", {
            required: "Campo requerido",
          })}
        />
        <div className="py-4 px-2 flex flex-col gap-6 items-center" >
          <Controller 
            name="keepStudy"
            defaultValue={false}
            control={control}
            rules={{
              deps: ["endDate"],
              validate: (value, { endDate }) => {
                if (value && endDate) {
                  return "Desmarca este opción si ya no estás estudiando";
                }
                if (!value && !endDate) {
                  return "Campo requerido"
                }
                return true;
              }
            }}
            render={({ field, formState: { errors } }) => (
              <>
              <div className="flex gap-2 items-center w-full">
                <Checkbox id={checkId} checked={field.value} onCheckedChange={field.onChange}/>
                <label htmlFor={checkId}>¿Aun sigue estudiando?</label>
              </div>
              <div className="w-full text-left">
                {errors.keepStudy && <span className="text-red-500">{errors.keepStudy.message}</span>}
              </div>
              </>
            )}
          />
        </div>
        <section className="flex flex-col gap-6 w-fit mx-auto sm:flex-row">
          <div>
            <label className="font-medium text-sm">Fecha de ingreso</label>
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: "Campo requerido",
                deps: ["endDate"],
                validate: (value, { endDate }) => {
                  if (endDate && value > endDate) {
                    return "La fecha de inicio no puede ser mayor a la fecha final";
                  }
                  return true;
                }
              }}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  label="Fecha de ingreso"
                  error={formState.errors.startDate}
                  endMonth={maxDate}
                />
              )}
            />
          </div>
          <div>
          <label className="font-medium text-sm">Fecha de finalización</label>
            <Controller
              name="endDate"
              control={control}
              rules={{
                deps: ["keepStudy", "startDate"],
                validate: (value, { keepStudy, startDate }) => {
                  if (!keepStudy && !value) {
                    return "Campo requerido"
                  }
                  if (value && startDate && value < startDate) {
                    return "La fecha final no puede ser menor a la fecha de inicio";
                  }
                  return true;
                }
              }}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  showClearButton
                  label="Fecha de finalización"
                  error={formState.errors.endDate}
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
