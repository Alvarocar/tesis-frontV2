import useSWR from "swr";
import { useEffect } from "react";
import type { FieldError } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@app/modules/common/datePicker";
import { DateRange } from "@app/util/date/dateRange.validator";
import applicantRepository from "@app/repositories/applicant.repository";
import { formatDate, parseDate } from "@app/util/date/dateParser.util";
import { Button } from "@app/components/ui/button";
import { useAuth } from "@app/hooks/useAuth.hook";
import { Form } from "@app/modules/common/form";
import { useResumeContext } from "@app/context/resume.context";
import useMutate from "@app/hooks/useMutation.hook";
import { ENV } from "@app/constants";
import { toast } from "@app/hooks/use-toast";
import { toPersonalInfoDefaults, type PersonalInfoFormData } from './usePersonalInfoFormData';
import type { TCountryOption, TDepartmentOption, TCityOption } from '@app/@types/geo';
import { ESex } from '@app/enums/sex.enum';
import { EGender } from '@app/enums/gender.enum';
import { ESexualOrientation } from '@app/enums/sexual-orientation.enum';
import { EEthnicGroup } from '@app/enums/ethnic-group.enum';
import { toApplicantPersonalInfoPayload } from './personalInfo.adapter';
import { personalInfoSchema } from './PersonalInfoForm.validator';
import { useCities, useCountries, useDepartments } from '@app/hooks/useGeo.hook';

const { InputField } = Form;

const SEX_OPTIONS = Object.values(ESex);
const GENDER_OPTIONS = Object.values(EGender);
const ORIENTATION_OPTIONS = Object.values(ESexualOrientation);
const ETHNIC_OPTIONS = Object.values(EEthnicGroup);

const birthDateRange = DateRange.init()
  .setStartDateRelative({ year: -75, month: 0, day: 0 })
  .setEndDateRelative({ year: -15, month: 11, day: 31 });

const PersonalInfoForm = () => {
  const { token } = useAuth();
  const { data } = useSWR(token ? token : null, applicantRepository.getApplicant.bind(applicantRepository));
  const { isLoading, mutate, error } = useMutate(applicantRepository.patchPersonalInfo.bind(applicantRepository));
  const { refresh } = useResumeContext();
  const {
    watch,
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  const countryOfBirth = watch('countryOfBirth');
  const countryOfResidence = watch('countryOfResidence');
  const departmentOfBirth = watch('departmentOfBirth');
  const departmentOfResidence = watch('departmentOfResidence');

  // Cascada geo. Las keys salen de `geoKeys`, así que un `departments(48)`
  // pedido aca se sirve desde cache si otro formulario ya lo trajo (o al
  // reves). Antes usabamos keys distintas ('geo-departments' vs
  // 'geo-departments-residence') y eso duplicaba la request.
  const { data: countries = [] } = useCountries();
  const { data: birthDepartments = [] } = useDepartments(countryOfBirth?.id);
  const { data: residenceDepartments = [] } = useDepartments(countryOfResidence?.id);
  const { data: birthCities = [] } = useCities(departmentOfBirth?.id);
  const { data: residenceCities = [] } = useCities(departmentOfResidence?.id);

  useEffect(() => {
    if (!data) return;
    reset({
      ...toPersonalInfoDefaults(data),
      birthDate: parseDate(data.birthDate),
    });
  }, [data, reset])

  const send = async (formData: PersonalInfoFormData) => {
    const [, error] = await mutate(toApplicantPersonalInfoPayload(formData));

    if (error) return;
    toast({
      title: 'Actualizado',
      duration: 2000,
    })
    try {
      await refresh();
    } catch (e) {
      if (ENV.MODE === 'development') {
        console.error(e);
      } 
    }
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium">Información Personal</legend>
      <fieldset className="grid grid-cols-2 gap-x-6 gap-y-6">
        <InputField
          label="Nombre(s)"
          error={errors.firstName}
          {...register("firstName")}
        />
        <InputField
          label="Apellido(s)"
          error={errors.lastName}
          {...register("lastName")}
        />

        <InputField
          label="Numero de identificación"
          type="text"
          error={errors.identification}
          {...register("identification")}
        />

        <InputField
          label="Numero de celular"
          inputMode="numeric"
          type="tel"
          error={errors.phoneNumber}
          {...register("phoneNumber")}
        />
        <div className="flex col-span-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Fecha de nacimiento</label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  label="Fecha de nacimiento"
                  error={formState.errors.birthDate}
                  startMonth={birthDateRange.start}
                  endMonth={birthDateRange.end}
                />
              )}
            />
          </div>
        </div>

        <InputField
          label="Aspiración salarial"
          type="number"
          error={errors.salaryAspiration}
          {...register('salaryAspiration', { valueAsNumber: true })}
        />

        <div className="col-span-2 grid grid-cols-2 gap-6 rounded border p-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            País de nacimiento
            <Controller
              name="countryOfBirth"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    onChange={(event) => {
                      const selected: TCountryOption | null =
                        countries.find((country) => String(country.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      setValue('departmentOfBirth', null);
                      setValue('cityOfBirth', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.countryOfBirth ? (
                    <span className="text-red-500">{formState.errors.countryOfBirth.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Departamento de nacimiento
            <Controller
              name="departmentOfBirth"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!countryOfBirth}
                    onChange={(event) => {
                      const selected: TDepartmentOption | null =
                        birthDepartments.find((department) => String(department.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      setValue('cityOfBirth', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {birthDepartments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.departmentOfBirth ? (
                    <span className="text-red-500">{formState.errors.departmentOfBirth.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Ciudad de nacimiento
            <Controller
              name="cityOfBirth"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!departmentOfBirth}
                    onChange={(event) => {
                      const selected: TCityOption | null =
                        birthCities.find((city) => String(city.id) === event.target.value) ?? null;
                      field.onChange(selected);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {birthCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.cityOfBirth ? (
                    <span className="text-red-500">{formState.errors.cityOfBirth.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            País de residencia
            <Controller
              name="countryOfResidence"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    onChange={(event) => {
                      const selected: TCountryOption | null =
                        countries.find((country) => String(country.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      setValue('departmentOfResidence', null);
                      setValue('cityOfResidence', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.countryOfResidence ? (
                    <span className="text-red-500">{formState.errors.countryOfResidence.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Departamento de residencia
            <Controller
              name="departmentOfResidence"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!countryOfResidence}
                    onChange={(event) => {
                      const selected: TDepartmentOption | null =
                        residenceDepartments.find((department) => String(department.id) === event.target.value) ?? null;
                      field.onChange(selected);
                      setValue('cityOfResidence', null);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {residenceDepartments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.departmentOfResidence ? (
                    <span className="text-red-500">{formState.errors.departmentOfResidence.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Ciudad de residencia
            <Controller
              name="cityOfResidence"
              control={control}
              render={({ field, formState }) => (
                <>
                  <select
                    className="rounded border px-3 py-2"
                    value={field.value?.id != null ? String(field.value.id) : ''}
                    disabled={!departmentOfResidence}
                    onChange={(event) => {
                      const selected: TCityOption | null =
                        residenceCities.find((city) => String(city.id) === event.target.value) ?? null;
                      field.onChange(selected);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <option value="">Seleccione</option>
                    {residenceCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {formState.errors.cityOfResidence ? (
                    <span className="text-red-500">{formState.errors.cityOfResidence.message as string}</span>
                  ) : null}
                </>
              )}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Sexo
          <select className="border rounded px-3 py-2" {...register('sex')}>
            <option value="">Seleccione</option>
            {SEX_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {renderFieldError(errors.sex)}
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Género
          <select className="border rounded px-3 py-2" {...register('genre')}>
            <option value="">Seleccione</option>
            {GENDER_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {renderFieldError(errors.genre)}
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Orientación sexual
          <select className="border rounded px-3 py-2" {...register('sexualOrientation')}>
            <option value="">Seleccione</option>
            {ORIENTATION_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {renderFieldError(errors.sexualOrientation)}
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Grupo étnico
          <select className="border rounded px-3 py-2" {...register('ethnicGroup')}>
            <option value="">Seleccione</option>
            {ETHNIC_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {renderFieldError(errors.ethnicGroup)}
        </label>

        {error ? <p className="text-red-400">{error.message}</p> : null}
      </fieldset>
      <Button className="mt-5" type="submit" disabled={isLoading}>Guardar</Button>
    </form>
  );
};

const renderFieldError = (error: FieldError | undefined) =>
  error?.message ? <span className="text-red-500">{error.message}</span> : null;

export default PersonalInfoForm;
