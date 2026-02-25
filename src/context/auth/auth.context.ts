import { createContext } from "react";
import { TAuthContext } from "@app/@types/auth";

export const AuthContext = createContext<TAuthContext>({
  isAuth: false,
  isLoading: true,
  userType: undefined,
  token: undefined,
  reValidate: () => {},
})
