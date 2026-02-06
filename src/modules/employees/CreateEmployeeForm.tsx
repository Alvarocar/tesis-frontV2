import { useId } from "react";
import { useForm } from "react-hook-form";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { Form } from "@app/modules/common/form";
import { stubUndefined } from "@app/util/stub";
import { TResume } from "@app/@types/resume";
import { toast } from "@app/util/toast";
import recruiterRepository from "@app/repositories/recruiter.repository";

type Props = {
  onFinish?: VoidFunction,
}

const { InputField } = Form

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const maxDate = new Date();

export const CreateEmployeeForm: React.FC<Props> = ({ 
  onFinish = stubUndefined,
}) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });
  const { mutate, isLoading, error } = useMutate(recruiterRepository.createRecruiter.bind(recruiterRepository))

  const send = async (data: FormData) => {
    const [, error] = await mutate({ 
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
     })
     if (error) return;
     toast.successful('Empleado creado con éxito', "Se envio un correo al nuevo empleado con sus credenciales de acceso.");
     onFinish();
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium" >Registrar un nuevo Empleado</legend>
      <fieldset>
      <InputField
          label="Nombre"
          classNameWrapper="mb-4"
          error={errors.firstName}
          {...register("firstName", {
            required: "Campo requerido",
          })}
        />
        <InputField
          label="Apellido"
          error={errors.lastName}
          {...register("lastName", {
            required: "Campo requerido",
          })}
        />
        <InputField
          label="Correo electrónico"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Campo requerido",
          })}
        />
      </fieldset>
      <p className="text-red-600">{error?.message}</p>
      <footer className="pt-5 flex justify-center">
        <Button type="submit" disabled={isLoading} >Guardar</Button>
      </footer>
    </form>
  )
}
