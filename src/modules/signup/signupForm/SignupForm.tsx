import { Link } from "wouter";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ApplicantRepository from "@app/repositories/applicant.repository";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { Form } from "@app/modules/common/form";
import { emailRegex } from "@app/util/regex";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const { InputField } = Form

const SignupForm = () => {

  const [errorMsg, setErrorMsg] = useState('');

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
  })

  const { mutate, isLoading, error } = useMutate(ApplicantRepository.signup.bind(ApplicantRepository))

  const onSubmit: SubmitHandler<Inputs> = async (args) => {
    try {
      const [resp, error] = await mutate(args)
      if (error) {
        return setErrorMsg(error.message);
      }
      //TODO: use resp to authenticate the applicant.
    } catch (e) { console.error(e) }
  }

  console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend className="font-bold text-lg" >Crear una cuenta</legend>
      <fieldset className="flex flex-col gap-4">
        <Controller
          name='firstName'
          control={control}
          rules={{ required: 'Campo requerido' }}
          render={({ formState: { errors }, field }) =>
              <InputField {...field} label="Nombre(s)" error={errors.firstName} />}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Campo requerido' }}
          render={({ formState: { errors }, field }) =>
            <InputField {...field} label="Apellido(s)" error={errors.lastName} />}
        />
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

      <p className="md:hidden">¿Ya tienes una cuenta? <Link className='text-sky-500' href="/sign-in">haz clic aquí</Link></p>
    </form>
  )
}

export default SignupForm;
