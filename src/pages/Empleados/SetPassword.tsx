import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'wouter';
import recruiterRepository from '@app/repositories/recruiter.repository';
import { ROUTES_PATHS } from '@app/constants/routes.constant';

interface FormInputs {
  password: string;
  confirmPassword: string;
}

export const SetPassword: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, navigate] = useLocation(); // Import corrected, 'useNavigate' replaced by 'useRedirect'
  
  const [queryParams] = useSearchParams();
  const token = queryParams.get('token');

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  if (!token) {
    navigate(ROUTES_PATHS.NOT_FOUND);
    return null;
  }

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage(null); // Clear any previous error messages

    if (data.password !== data.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const repository = recruiterRepository;
      await repository.changePassword(token, data.password);
      navigate(ROUTES_PATHS.SIGN_IN_RECRUITER);
    } catch (error) {
      setErrorMessage((error as Error).message || 'Algo salió mal. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Escribe tu nueva contraseña</h2>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true })}
            className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.password && <p className="text-red-500 text-sm">La contraseña es obligatoria</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', { required: true })}
            className={`mt-1 block w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">Confirmar contraseña</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded-md"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};