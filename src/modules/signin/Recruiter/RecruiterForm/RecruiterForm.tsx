import { Button } from "@app/components/ui/button";
import { ENV } from "@app/constants";
import { useAuth } from "@app/hooks/useAuth.hook";
import useMutate from "@app/hooks/useMutation.hook";
import { Form } from "@app/modules/common/form";
import recruiterRepository from "@app/repositories/recruiter.repository";
import { useForm } from "react-hook-form";

const { InputField } = Form;

type FormData = {
  email: string;
  password: string;
}

const RecruiterForm = () => {

  const { register, handleSubmit } = useForm<FormData>()

  const { mutate, isLoading, error } = useMutate(recruiterRepository.signin.bind(recruiterRepository));

  const { setAuthToken } = useAuth()

  const send = async (data: FormData) => {
    const [resp, error] = await mutate(data);
    if (error || !resp) {
      if (ENV.MODE === 'development') {
        console.error(error)
      }
      return;
    }
    setAuthToken(resp.data.token);
  }

  return (
    <form onSubmit={handleSubmit(send)} className="p-6">
      <legend className="font-semibold text-lg">Autenticarse como Reclutador</legend>
      <fieldset className="flex flex-col gap-5 py-2">
        <InputField
          {...register('email', { required: 'Este campo es requerido' })}
          label="Correo"
          type="email"
        />
        <InputField
          {...register('password', { required: 'Este campo es requerido' })}
          label="Contraseña"
          type="password"
        />
      </fieldset>
      {error && <p className="text-red-400">{error.message}</p> }
      <footer className="pt-4">
        <Button disabled={isLoading} type="submit">
          Ingresar
        </Button>
      </footer>
    </form>
  )
}

export default RecruiterForm;
