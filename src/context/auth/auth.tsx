import Cookies from "js-cookie";
import { useCallback, useMemo } from "react";
import { TAuthContext } from "@app/@types/auth";
import { AuthContext } from "./auth.context";
import { decodeToken } from "@app/util/token";
import useSWR from "swr";
import authRepository from "@app/repositories/auth.repository";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Una sola verificación contra el backend.
  // Sin retry y sin foco: si falla (401), `error` queda seteado y
  // `isAuth: false`. No queremos volver a pegarle a /auth/check en
  // bucle ni dispararlo desde un evento, porque 401 sin token es
  // un estado válido y no debe reintentarse.
  const { isLoading, error, mutate } = useSWR(
    'check-auth',
    authRepository.check.bind(authRepository),
    { shouldRetryOnError: false, revalidateOnFocus: false, revalidateIfStale: false },
  );

  const reValidate = useCallback(() => mutate(), [mutate]);

  const state = useMemo<TAuthContext>(() => ({
    isAuth: !isLoading && !error,
    isLoading,
    userType: Cookies.get('token') ? decodeToken(Cookies.get('token')!)?.userType : undefined,
    token: Cookies.get('token'),
    reValidate,
  }), [isLoading, error, reValidate])

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
