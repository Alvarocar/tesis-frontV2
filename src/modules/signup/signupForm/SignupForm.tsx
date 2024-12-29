import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@app/components/ui/button";
import { Label } from "@app/components/ui/label";
import { Form } from "@app/modules/common/form";
import { emailRegex } from "@app/util/regex";
import { Link } from "wouter";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const { InputField } = Form

const SignupForm = () => {

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (args) => {
    console.log(args)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend>Crear una cuenta</legend>
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
      </fieldset>
      <Button className="my-5" type="submit">Registrarme</Button>

      <p className="md:hidden">¿Ya tienes una cuenta? <Link className='text-sky-500' href="/sign-in">haz clic aquí</Link></p>
    </form>
  )
}

export default SignupForm;
