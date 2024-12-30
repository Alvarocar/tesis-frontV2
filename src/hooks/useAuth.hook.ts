import Cookies from "js-cookie";
import { useCallback, useContext} from "react";
import { AuthContext } from "@app/context/auth/auth.context";
import { decodeToken } from "@app/util/token";

export const useAuth = () => {
  const [state, dispatch] = useContext(AuthContext)

  const checkAuth = useCallback(() => {
    const token = Cookies.get("token");
    if (!token) {
      return dispatch({
        type: "SET_AUTH",
        payload: { isAuth: false, userType: undefined },
      });
    }

    const tokenData = decodeToken(token);
    if (tokenData && tokenData.exp > Date.now() / 1000) {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuth: true, userType: tokenData.userType || undefined },
      });
    } else {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuth: false, userType: undefined },
      });
    }
  }, [dispatch]);

  const setAuthToken = (token: string) => {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp > Date.now() / 1000) {
      Cookies.set("token", token, { expires: decoded.exp / 86400 });
      dispatch({ type: "SET_TOKEN", payload: token });
    } else {
      console.error("Token is expired or invalid");
    }
  };

  const removeAuthToken = () => {
    Cookies.remove("token");
    dispatch({ type: "REMOVE_TOKEN" });
  };

  return {
    isAuth: state.isAuth,
    isLoading: state.isLoading,
    userType: state.userType,
    checkAuth,
    setAuthToken,
    removeAuthToken,
  };
};
