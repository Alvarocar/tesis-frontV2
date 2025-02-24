//@ts-nocheck
import useSWR from "swr";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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

const { InputField } = Form;

type FormData = {
  firstName: string;
  lastName: string;
  identification: number;
  phone_number: string;
  birth_date: Date;
  direction: string;
};

const birthDateRange = DateRange.init()
  .setStartDateRelative({ year: -75, month: 0, day: 0 })
  .setEndDateRelative({ year: -15, month: 11, day: 31 });

  const PersonalInfoForm = () => {
    const { token } = useAuth()
    const { data } = useSWR(token ? token : null, applicantRepository.getApplicant.bind(applicantRepository));
    const { isLoading, mutate, error } = useMutate(applicantRepository.patchPersonalInfo.bind(applicantRepository));
    const { refresh } = useResumeContext();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormData>();

  useEffect(() => {
    if (!data) return;
    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      identification: data.identification,
      birth_date: parseDate(data.birth_date),
      direction: data.direction,
      phone_number: data.phone_number,
    });
  }, [data, reset])

  const send = async (data: FormData) => {
    const [, error] = await mutate({
      ...data,
      birth_date: formatDate(data.birth_date)
    });

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
          {...register("firstName", {
            required: "Campo requerido",
          })}
        />
        <InputField
          label="Apellido(s)"
          error={errors.lastName}
          {...register("lastName", {
            required: "Campo requerido",
          })}
        />

        <InputField          
          label="Numero de identificación"
          type="number"
          error={errors.identification}
          {...register("identification", {
            required: "Campo requerido",
            valueAsNumber: true,
          })}
        />

        <InputField
          label="Numero de celular"
          inputMode="numeric"
          type="tel"
          error={errors.direction}
          {...register("phone_number", {
            required: "Campo requerido",
          })}
        />
        <div className="flex col-span-2 gap-6">
          <div>
            <label className="font-medium text-sm">Fecha de nacimiento</label>
            <Controller
              name="birth_date"
              control={control}
              render={({ field, formState }) => (
                <DatePicker
                  {...field}
                  label="Fecha de nacimiento"
                  error={formState.errors.birth_date}
                  startMonth={birthDateRange.start}
                  endMonth={birthDateRange.end}
                />
              )}
            />
          </div>
          <InputField
            classNameWrapper="flex-1"
            label="Dirección de residencia"
            error={errors.direction}
            {...register("direction", {
              required: "Campo requerido",
            })}
          />
        </div>
        {error ? <p className="text-red-400">{error.message}</p> : null}
      </fieldset>
      <Button className="mt-5" type="submit" disabled={isLoading}>Guardar</Button>
    </form>
  );
};

export default PersonalInfoForm;
