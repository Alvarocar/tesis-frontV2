import Cookies from "js-cookie";
import { useEffect, useMemo, useReducer } from "react";
import { TAuthContext } from "@app/@types/auth";
import { AuthContext } from "./auth.context";
import { decodeToken } from "@app/util/token";
import useSWR from "swr";
import authRepository from "@app/repositories/auth.repository";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, error, mutate } = useSWR('check-auth', authRepository.check.bind(authRepository), { shouldRetryOnError: false, revalidateOnFocus: false });

  const state = useMemo<TAuthContext>(() => ({
    isAuth: !isLoading && !error,
    isLoading,
    userType: Cookies.get('token') ? decodeToken(Cookies.get('token')!)?.userType : undefined,
    token: Cookies.get('token'),
    reValidate: () => mutate(),
  }), [isLoading, error])

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
