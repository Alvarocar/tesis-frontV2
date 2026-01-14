import { Link } from "wouter";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@app/modules/common/form";
import { Button } from "@app/components/ui/button";
import { emailRegex } from "@app/util/regex";
import useMutate from "@app/hooks/useMutation.hook";
import { useAuth } from "@app/hooks/useAuth.hook";
import authRepository from "@app/repositories/auth.repository";

const { InputField } = Form;

type Inputs = {
  email: string;
  password: string;
}

const SigninForm = () => {

  const [errorMsg, setError] = useState('')

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const { mutate, isLoading } = useMutate(authRepository.signin.bind(authRepository))
  const { setAuthToken } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async (args) => {
    setError('')
    try {
      const [resp, error] = await mutate(args)
      if (error) {
        return setError(error.message);
      }
      if (resp?.data.token) {
        setAuthToken(resp.data.token);
      }
      
      //TODO: use resp to authenticate the applicant.
    } catch (e) { console.error(e) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <legend className="font-bold text-lg" >Ingresar</legend>
    <fieldset className="flex flex-col gap-4">
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Campo requerido', pattern: { value: emailRegex, message: 'Este correo no es valido' } }}
        render={({ formState: { errors }, field }) =>
          <InputField {...field} label="Correo electrónico" error={errors.email} />}
      />
      <Controller 
        name="password"
        control={control}
        rules={{ required: 'Campo requerido' }}
        render={({ formState: { errors }, field }) => 
          <InputField type="password" {...field} label="Contraseña" error={errors.password} />}
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </fieldset>
    <Button disabled={isLoading} className="my-5" type="submit">Registrarme</Button>

    <p className="md:hidden">¿Aun no tienes una cuenta? <Link className='text-sky-500' href="/sign-up">haz clic aquí</Link></p>
  </form>
  )
}

export default SigninForm;