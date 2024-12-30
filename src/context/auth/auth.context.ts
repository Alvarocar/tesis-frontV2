import { createContext } from "react";
import { TAuthAction, TAuthContext } from "@app/@types/auth";

export const AuthContext = createContext<[TAuthContext, React.Dispatch<TAuthAction>]>([
  {
    isAuth: false,
    isLoading: true,
    userType: undefined,
    token: undefined,
  },
  () => null,
])
