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
import { Button } from "@app/components/ui/button";
import { toast } from "@app/util/toast";
import { useCities, useCountries, useDepartments } from "@app/hooks/useGeo.hook";
import { toExperiencePayload, type ExperienceFormData } from './experienceForm.adapter';
import type { TCityOption, TCountryOption, TDepartmentOption } from "@app/@types/geo";

type Props = {
  experience?: TResume.IExperience;
  onFinish?: VoidFunction;
}

type FormData = ExperienceFormData;

const { InputField } = Form

const maxDate = new Date();

const ExperienceForm: React.FC<Props> = ({ experience, onFinish = stubUndefined }) => {
  
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      id: experience?.id,
      company: experience?.company ?? '',
      description: experience?.description ?? '',
      rol: experience?.rol ?? '',
      keepWorking: experience?.keepWorking ?? false,
      startDate: parseDate(experience?.startDate),
      endDate: parseDate(experience?.endDate),
      country: experience?.country ?? null,
      department: experience?.department ?? null,
      city: experience?.city ?? null,
    }
  });

  const { refresh, resume_id } = useResumeContext();

  const { mutate, isLoading } = useMutate(resumeRepository.patchExperience.bind(resumeRepository));

  const checkId = useId()

  // Cascada geo: cada nivel depende del anterior. Los hooks comparten cache
  // con otros formularios vía `geoKeys`, así que no hay requests duplicadas.
  const country = watch('country');
  const department = watch('department');
  const { data: countries = [] } = useCountries();
  const { data: departments = [] } = useDepartments(country?.id);
  const { data: cities = [] } = useCities(department?.id);
  
  const send: SubmitHandler<FormData> = async (data) => {
    const { country, department, city, startDate, endDate, ...rest } = data;
    const [,error] = await mutate({
      resume_id,
      experience: toExperiencePayload(
        rest,
        {
          startDate: formatDate(startDate) ?? '',
          endDate: formatDate(endDate),
        },
        { country, department, city },
      ),
    })

    if (error) {
      toast.failed('Error', 'Hubo un error en la solicitud, vuelva a intentar');
      return
    };

    refresh();
    toast.successful('Actualizado', 'La experiencia ha sido actualizada');
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
          <Label>Descripción del rol desempeñado</Label>  
          <Textarea
            {...register('description')}
            className={classNames("bg-white resize-none h-52 focus-visible:outline-0 focus-visible:border-0", { 'border border-red-500': errors.description })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 rounded border p-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm font-medium">
            País
            <Controller
              name="country"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    onChange={(event) => {
                      const selected: TCountryOption | null =
                        countries.find((c) => String(c.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      // Limpiar hijos: cambiamos el país, el departamento y la
                      // ciudad previamente elegidos ya no son válidos.
                      setValue('department', null);
                      setValue('city', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {formState.errors.country && (
                    <span className="text-red-500">{formState.errors.country.message as string}</span>
                  )}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Departamento
            <Controller
              name="department"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!country}
                    onChange={(event) => {
                      const selected: TDepartmentOption | null =
                        departments.find((d) => String(d.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      setValue('city', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  {formState.errors.department && (
                    <span className="text-red-500">{formState.errors.department.message as string}</span>
                  )}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Ciudad
            <Controller
              name="city"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!department}
                    onChange={(event) => {
                      const selected: TCityOption | null =
                        cities.find((c) => String(c.id) === event.target.value) ?? null;
                      field.onChange(selected);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {formState.errors.city && (
                    <span className="text-red-500">{formState.errors.city.message as string}</span>
                  )}
                </>
              )}
            />
          </label>
        </div>
        <div className="py-4 px-2 flex flex-col gap-6 items-center" >
          <Controller
            name="keepWorking"
            defaultValue={false}
            control={control}
            rules={{
              deps: ["endDate"],
              validate: (value, { endDate }) => {
                if (value && endDate) {
                  return "Desmarca este opción si ya no estás trabajando";
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
                <label htmlFor={checkId}>¿Aun sigue trabajando ahi?</label>
              </div>
              <div className="w-full text-left">
                {errors.keepWorking && <span className="text-red-500">{errors.keepWorking.message}</span>}
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
                deps: ["keepWorking", "startDate"],
                validate: (value, { keepWorking, startDate }) => {
                  if (!keepWorking && !value) {
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
      <footer className="pt-4 flex justify-center">
        <Button type="submit" >Guardar</Button>
      </footer>
    </form>
  )
}

export default ExperienceForm;
