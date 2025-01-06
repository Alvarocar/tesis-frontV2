import { TResume } from "@app/@types/resume"
import { Checkbox } from "@app/components/ui/checkbox";
import { DatePicker } from "@app/modules/common/datePicker";
import { Form } from "@app/modules/common/form";
import { parseDate } from "@app/util/date/dateParser.util";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  study?: TResume.IEducation,
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
}) => {

  const {
    register,
    control,
    formState: { errors },
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

  const checkId = useId()

  return (
    <form>
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
    </form>
  )
}

export default StudyForm
