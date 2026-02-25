import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "@app/context/auth/auth.context";
import { decodeToken } from "@app/util/token";

export const useAuth = () => {
  const state = useContext(AuthContext);

  const setAuthToken = (token: string) => {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp > Date.now() / 1000) {
      Cookies.set("token", token, {
        expires: decoded.exp / 86400,
        sameSite: import.meta.env.DEV ? "lax" : "Strict",
      });
      state.reValidate();
    } else {
      console.error("Token is expired or invalid");
    }
  };

  const removeAuthToken = () => {
    Cookies.remove("token");
    state.reValidate();
  };

  return {
    isAuth: state.isAuth,
    isLoading: state.isLoading,
    userType: state.userType,
    token: state.token,
    setAuthToken,
    removeAuthToken,
  };
};
