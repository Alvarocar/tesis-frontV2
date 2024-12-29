
import { useState } from 'react';

// Definimos un tipo genérico para la función del repositorio
type AsyncFunction<TArgs extends unknown[], TReturn> = (...args: TArgs) => Promise<TReturn>;

/**
 * Hook personalizado que maneja la llamada a un repositorio.
 * @param {AsyncFunction} method El método que será llamado (como ApplicantRepository.signup)
 * @returns {Object} Contiene la función mutate, y los estados de carga y error
 */
const useMutate = <TArgs extends unknown[], TReturn>(
  method: AsyncFunction<TArgs, TReturn>
) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TReturn | null>(null);

  const mutate = async (...args: TArgs): Promise<[TReturn | undefined, Error | undefined]> => {
    setLoading(true);
    setError(null);
    try {
      const result = await method(...args);
      setData(result);
      return [result, undefined];
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return [undefined, err instanceof Error ? err : { name: 'UnknownError', message: 'Ocurrió un error inesperado' }]
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
    data,
  };
};

export default useMutate;